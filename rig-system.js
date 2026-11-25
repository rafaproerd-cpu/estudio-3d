/**
 * ESTÚDIO 3D — DIAGNÓSTICO E VALIDAÇÃO DE RIG
 * Inspeciona rigs existentes. Não cria nem repara esqueletos automaticamente.
 */
(function (global) {
  'use strict';
  if (global.Estudio3DRig) return;

  function inspect(root, animations) {
    const bones = [];
    const skinnedMeshes = [];
    let meshCount = 0;
    if (root && typeof root.traverse === 'function') {
      root.traverse(item => {
        if (item && item.isBone) bones.push(item.name || '(osso sem nome)');
        if (item && item.isSkinnedMesh) {
          skinnedMeshes.push({
            name: item.name || '(malha sem nome)',
            bones: item.skeleton && Array.isArray(item.skeleton.bones) ? item.skeleton.bones.length : 0
          });
        }
        if (item && item.isMesh) meshCount += 1;
      });
    }
    const clips = Array.isArray(animations) ? animations : [];
    const boneCount = bones.length;
    const skinnedMeshCount = skinnedMeshes.length;
    let status = 'not_rigged';
    if (boneCount > 0 && skinnedMeshCount > 0) status = 'rigged';
    else if (boneCount > 0) status = 'skeleton_without_skinning';
    else if (skinnedMeshCount > 0) status = 'skinning_without_detectable_bones';
    const recommendations = [];
    if (status === 'not_rigged') recommendations.push('Este modelo ainda precisa de esqueleto e skinning.');
    else if (status === 'skeleton_without_skinning') recommendations.push('Há ossos, mas nenhuma malha vinculada ao esqueleto foi detectada.');
    else if (status === 'skinning_without_detectable_bones') recommendations.push('Há malha com skinning; confira a hierarquia de ossos do arquivo.');
    else recommendations.push('Rig detectado. Valide hierarquia, pesos e movimentos antes de animar.');
    if (clips.length === 0) recommendations.push('Nenhum clipe de animação veio junto com este modelo.');
    return {
      status, boneCount, bones, skinnedMeshCount, skinnedMeshes, meshCount,
      animationCount: clips.length,
      animationNames: clips.map(clip => clip && clip.name ? clip.name : 'Animação sem nome'),
      recommendations
    };
  }

  function validate(root) {
    const boneNodes = [];
    const skinnedMeshes = [];
    if (root && typeof root.traverse === 'function') {
      root.traverse(item => {
        if (item && item.isBone) boneNodes.push(item);
        if (item && item.isSkinnedMesh) skinnedMeshes.push(item);
      });
    }
    const names = boneNodes.map(bone => bone.name || '(osso sem nome)');
    const nameCounts = Object.create(null);
    names.forEach(name => { nameCounts[name] = (nameCounts[name] || 0) + 1; });
    const duplicateBoneNames = Object.keys(nameCounts).filter(name => nameCounts[name] > 1);
    const boneSet = new Set(boneNodes);
    const rootBones = boneNodes.filter(bone => {
      let parent = bone.parent;
      while (parent) {
        if (boneSet.has(parent)) return false;
        parent = parent.parent;
      }
      return true;
    });

    const meshReports = [];
    let missingAttributes = 0;
    let invalidBoneIndices = 0;
    let zeroWeightVertices = 0;
    let nonNormalizedVertices = 0;
    let checkedVertices = 0;

    skinnedMeshes.forEach(mesh => {
      const attributes = mesh.geometry && mesh.geometry.attributes;
      const indexAttr = attributes && attributes.skinIndex;
      const weightAttr = attributes && attributes.skinWeight;
      const skeletonBones = mesh.skeleton && Array.isArray(mesh.skeleton.bones) ? mesh.skeleton.bones : [];
      const report = {
        name: mesh.name || '(malha sem nome)',
        hasSkinIndex: Boolean(indexAttr),
        hasSkinWeight: Boolean(weightAttr),
        skeletonBoneCount: skeletonBones.length,
        invalidBoneIndices: 0,
        zeroWeightVertices: 0,
        nonNormalizedVertices: 0,
        status: 'valid'
      };
      if (!indexAttr || !weightAttr) {
        missingAttributes += 1;
        report.status = 'missing_skin_attributes';
      } else {
        const count = Math.min(indexAttr.count || 0, weightAttr.count || 0);
        for (let vertex = 0; vertex < count; vertex += 1) {
          checkedVertices += 1;
          let totalWeight = 0;
          let hasInfluence = false;
          const slots = Math.min(indexAttr.itemSize || 4, weightAttr.itemSize || 4);
          for (let slot = 0; slot < slots; slot += 1) {
            const weight = typeof weightAttr.getComponent === 'function'
              ? weightAttr.getComponent(vertex, slot)
              : weightAttr.array[vertex * weightAttr.itemSize + slot];
            const boneIndex = typeof indexAttr.getComponent === 'function'
              ? indexAttr.getComponent(vertex, slot)
              : indexAttr.array[vertex * indexAttr.itemSize + slot];
            if (weight > 0) {
              hasInfluence = true;
              totalWeight += weight;
              if (!Number.isInteger(boneIndex) || boneIndex < 0 || boneIndex >= skeletonBones.length) {
                report.invalidBoneIndices += 1;
              }
            }
          }
          if (!hasInfluence) report.zeroWeightVertices += 1;
          else if (Math.abs(totalWeight - 1) > 0.02) report.nonNormalizedVertices += 1;
        }
        if (report.invalidBoneIndices || report.zeroWeightVertices || report.nonNormalizedVertices) {
          report.status = 'weight_issues';
        }
      }
      invalidBoneIndices += report.invalidBoneIndices;
      zeroWeightVertices += report.zeroWeightVertices;
      nonNormalizedVertices += report.nonNormalizedVertices;
      meshReports.push(report);
    });

    const issues = [];
    if (boneNodes.length && rootBones.length !== 1) {
      issues.push('O esqueleto possui ' + rootBones.length + ' raízes ósseas; confira se a hierarquia é intencional.');
    }
    if (duplicateBoneNames.length) issues.push('Há nomes de ossos repetidos.');
    if (missingAttributes) issues.push(missingAttributes + ' malha(s) não possuem os atributos skinIndex e/ou skinWeight.');
    if (invalidBoneIndices) issues.push(invalidBoneIndices + ' influência(s) apontam para índices de ossos inválidos.');
    if (zeroWeightVertices) issues.push(zeroWeightVertices + ' vértice(s) não possuem influência de osso.');
    if (nonNormalizedVertices) issues.push(nonNormalizedVertices + ' vértice(s) possuem pesos cuja soma difere de 1.');
    if (!skinnedMeshes.length) issues.push('Nenhuma malha com skinning foi encontrada para validar os pesos.');
    const ok = boneNodes.length > 0 && skinnedMeshes.length > 0 && issues.length === 0;
    if (ok) issues.push('Hierarquia básica e pesos sem problemas detectáveis.');

    return {
      boneCount: boneNodes.length,
      rootBoneCount: rootBones.length,
      rootBoneNames: rootBones.map(bone => bone.name || '(osso sem nome)'),
      duplicateBoneNames,
      skinnedMeshCount: skinnedMeshes.length,
      checkedVertices,
      missingAttributes,
      invalidBoneIndices,
      zeroWeightVertices,
      nonNormalizedVertices,
      meshes: meshReports,
      ok,
      issues
    };
  }

  function getStatusLabel(report) {
    if (!report) return 'Diagnóstico indisponível';
    if (report.status === 'rigged') return 'Rig detectado';
    if (report.status === 'skeleton_without_skinning') return 'Esqueleto sem skinning';
    if (report.status === 'skinning_without_detectable_bones') return 'Skinning sem ossos detectáveis';
    return 'Sem rig detectado';
  }

  global.Estudio3DRig = Object.freeze({ version: '1.1.0', inspect, validate, getStatusLabel });
})(window);
