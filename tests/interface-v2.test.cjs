const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(
  path.join(__dirname, '..', 'interface-v2.html'),
  'utf8'
);

test('interface oferece exportação GLB do personagem selecionado', () => {
  assert.match(html, /import \{ GLTFExporter \} from 'three\/addons\/exporters\/GLTFExporter\.js';/);
  assert.match(html, /id="exportGLB"/);
  assert.match(html, /document\.querySelector\('#exportGLB'\)\.onclick/);
  assert.match(html, /\{ binary: true, onlyVisible: true \}/);
});

test('protótipos cobrem ave por categoria ou rig e outras famílias', () => {
  assert.match(html, /record\.category === 'avian' \|\| \(record\.category === 'animal' && record\.rigType === 'avian'\)/);
  for (const category of ['animal', 'robot', 'object', 'alien', 'creature']) {
    assert.ok(html.includes("record.category === '" + category + "'"), 'categoria ausente: ' + category);
  }
});

test('protótipos consideram a fase da vida', () => {
  assert.match(html, /const ageScale = \{/);
  for (const stage of ['baby', 'child', 'teen', 'adult', 'senior']) {
    assert.match(html, new RegExp(stage + ':'));
  }
  assert.match(html, /group\.scale\.setScalar\(ageScale\[record\.ageStage\] \|\| 1\)/);
});

test('projeto JSON preserva cadastro e transformação do personagem', () => {
  assert.match(html, /character: characterData \? \{/);
  assert.match(html, /position: character\.position\.toArray\(\)/);
  assert.match(html, /rotation: character\.rotation\.toArray\(\)/);
  assert.match(html, /scale: character\.scale\.toArray\(\)/);
});

test('importação reconstrói protótipos procedurais nos dois caminhos', () => {
  assert.ok((html.match(/generateCharacterPrototype\(\);/g) || []).length >= 2);
  assert.match(html, /imported\.model\.source === 'procedural_preview'/);
  assert.match(html, /restoreProcedural/);
});

test('JavaScript da interface passa pela análise sintática', () => {
  const match = html.match(/<script type="module">([\s\S]*?)<\/script>/);
  assert.ok(match, 'script principal da interface não encontrado');
  const source = match[1].replace(/^import .*;\s*$/gm, '');
  assert.doesNotThrow(() => new Function(source));
});
