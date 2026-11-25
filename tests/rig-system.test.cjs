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
