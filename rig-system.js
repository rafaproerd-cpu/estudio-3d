/**
 * ESTÚDIO 3D — DIAGNÓSTICO DE RIG
 * Analisa esqueletos e animações de modelos carregados.
 * Esta versão inspeciona rigs existentes; ainda não cria nem repara rigs.
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
            bones: item.skeleton && Array.isArray(item.skeleton.bones)
              ? item.skeleton.bones.length : 0
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
    if (status === 'not_rigged') {
      recommendations.push('Este modelo ainda precisa de esqueleto e skinning.');
    } else if (status === 'skeleton_without_skinning') {
      recommendations.push('Há ossos, mas nenhuma malha vinculada ao esqueleto foi detectada.');
    } else if (status === 'skinning_without_detectable_bones') {
      recommendations.push('Há malha com skinning; confira a hierarquia de ossos do arquivo.');
    } else {
      recommendations.push('Rig detectado. O próximo passo é validar hierarquia, pesos e movimentos.');
    }
    if (clips.length === 0) recommendations.push('Nenhum clipe de animação veio junto com este modelo.');

    return {
      status, boneCount, bones, skinnedMeshCount, skinnedMeshes, meshCount,
      animationCount: clips.length,
      animationNames: clips.map(clip => clip && clip.name ? clip.name : 'Animação sem nome'),
      recommendations
    };
  }

  function getStatusLabel(report) {
    if (!report) return 'Diagnóstico indisponível';
    if (report.status === 'rigged') return 'Rig detectado';
    if (report.status === 'skeleton_without_skinning') return 'Esqueleto sem skinning';
    if (report.status === 'skinning_without_detectable_bones') return 'Skinning sem ossos detectáveis';
    return 'Sem rig detectado';
  }

  global.Estudio3DRig = Object.freeze({ version: '1.0.0', inspect, getStatusLabel });
})(window);
