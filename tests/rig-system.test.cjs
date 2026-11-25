const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadRigSystem() {
  const window = {};
  const context = vm.createContext({ window });
  const source = fs.readFileSync(path.join(__dirname, '..', 'rig-system.js'), 'utf8');
  vm.runInContext(source, context, { filename: 'rig-system.js' });
  return window.Estudio3DRig;
}

function makeTree(items) {
  return { traverse(callback) { items.forEach(callback); } };
}

function attribute(values, itemSize) {
  return {
    array: values,
    itemSize,
    count: values.length / itemSize,
    getComponent(vertex, component) { return values[vertex * itemSize + component]; }
  };
}

test('identifica um modelo sem rig', () => {
  const rig = loadRigSystem();
  const report = rig.inspect(makeTree([{ isMesh: true, name: 'Body' }]), []);
  assert.equal(report.status, 'not_rigged');
  assert.equal(report.boneCount, 0);
  assert.equal(report.meshCount, 1);
  assert.match(rig.getStatusLabel(report), /Sem rig/);
});

test('identifica ossos, malhas vinculadas e animações', () => {
  const rig = loadRigSystem();
  const root = makeTree([
    { isBone: true, name: 'Hips' },
    { isBone: true, name: 'Head' },
    { isSkinnedMesh: true, isMesh: true, name: 'BodySkin', skeleton: { bones: [{}, {}] } }
  ]);
  const report = rig.inspect(root, [{ name: 'Idle' }, { name: 'Walk' }]);
  assert.equal(report.status, 'rigged');
  assert.equal(report.boneCount, 2);
  assert.equal(report.skinnedMeshCount, 1);
  assert.equal(report.skinnedMeshes[0].bones, 2);
  assert.deepEqual(report.animationNames, ['Idle', 'Walk']);
  assert.equal(report.animationCount, 2);
});

test('distingue esqueleto sem skinning e registra recomendações', () => {
  const rig = loadRigSystem();
  const report = rig.inspect(makeTree([{ isBone: true, name: 'Root' }]), []);
  assert.equal(report.status, 'skeleton_without_skinning');
  assert.equal(report.animationCount, 0);
  assert.ok(report.recommendations.length >= 2);
});

test('valida hierarquia simples e pesos normalizados sem apontar problemas', () => {
  const rig = loadRigSystem();
  const rootBone = { isBone: true, name: 'Root', parent: null };
  const childBone = { isBone: true, name: 'Spine', parent: rootBone };
  const mesh = {
    isSkinnedMesh: true, isMesh: true, name: 'Body',
    skeleton: { bones: [rootBone, childBone] },
    geometry: { attributes: {
      position: { count: 2 },
      skinIndex: attribute([0, 1, 0, 1, 0, 1, 0, 1], 4),
      skinWeight: attribute([1, 0, 0, 0, 0.4, 0.6, 0, 0], 4)
    } }
  };
  const report = rig.validate(makeTree([rootBone, childBone, mesh]));
  assert.equal(report.boneCount, 2);
  assert.equal(report.rootBoneCount, 1);
  assert.equal(report.checkedVertices, 2);
  assert.equal(report.invalidBoneIndices, 0);
  assert.equal(report.zeroWeightVertices, 0);
  assert.equal(report.nonNormalizedVertices, 0);
  assert.equal(report.ok, true);
});

test('detecta índice de osso inválido, vértice sem peso e soma incorreta', () => {
  const rig = loadRigSystem();
  const rootBone = { isBone: true, name: 'Root', parent: null };
  const mesh = {
    isSkinnedMesh: true, isMesh: true, name: 'BrokenMesh',
    skeleton: { bones: [rootBone] },
    geometry: { attributes: {
      position: { count: 3 },
      skinIndex: attribute([3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 4),
      skinWeight: attribute([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2], 4)
    } }
  };
  const report = rig.validate(makeTree([rootBone, mesh]));
  assert.equal(report.invalidBoneIndices, 1);
  assert.equal(report.zeroWeightVertices, 1);
  assert.equal(report.nonNormalizedVertices, 1);
  assert.equal(report.ok, false);
});

test('detecta atributos de skinning ausentes e múltiplas raízes', () => {
  const rig = loadRigSystem();
  const rootA = { isBone: true, name: 'RootA', parent: null };
  const rootB = { isBone: true, name: 'RootB', parent: null };
  const mesh = { isSkinnedMesh: true, isMesh: true, name: 'NoAttributes',
    skeleton: { bones: [rootA, rootB] }, geometry: { attributes: {} } };
  const report = rig.validate(makeTree([rootA, rootB, mesh]));
  assert.equal(report.rootBoneCount, 2);
  assert.equal(report.missingAttributes, 1);
  assert.equal(report.ok, false);
});
