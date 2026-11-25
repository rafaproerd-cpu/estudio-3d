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

test('regenerar protótipo substitui o personagem anterior em vez de duplicá-lo', () => {
  assert.match(html, /if \(character\) \{\s*scene\.remove\(character\);\s*const previousIndex = objects\.indexOf\(character\);\s*if \(previousIndex >= 0\) objects\.splice\(previousIndex, 1\);\s*\}/);
  assert.match(html, /selected = group;/);
});

test('cor primária salva no cadastro é reaplicada ao reconstruir o protótipo', () => {
  assert.match(html, /record\.appearance && record\.appearance\.colors/);
  assert.match(html, /record\.appearance\.colors\.primary/);
  assert.ok(html.includes("savedPrimaryColor && /^#[0-9a-f]{6}$/i.test(savedPrimaryColor)"));
});

test('oferece cor independente para detalhes do personagem', () => {
  assert.match(html, /id="accentColor"/);
  assert.match(html, /accent\.name = 'character-accent'/);
  assert.match(html, /material\.name==='character-accent'/);
  assert.match(html, /colors: \{ accent: e\.target\.value \}/);
});

test('reaplica a cor dos detalhes salva ao reconstruir o protótipo', () => {
  assert.match(html, /record\.appearance && record\.appearance\.colors/);
  assert.match(html, /record\.appearance\.colors\.accent/);
  assert.ok(html.includes("savedAccentColor && /^#[0-9a-f]{6}$/i.test(savedAccentColor)"));
  assert.match(html, /accentMaterialFound/);
});

test('cor principal não sobrescreve o material independente dos detalhes', () => {
  const handlerStart = html.indexOf("document.querySelector('#color').oninput");
  const handlerEnd = html.indexOf("document.querySelector('#accentColor').oninput", handlerStart);
  assert.ok(handlerStart >= 0 && handlerEnd > handlerStart, 'controles de cor não encontrados');
  const primaryColorHandler = html.slice(handlerStart, handlerEnd);
  assert.match(primaryColorHandler, /material\.color && material\.name!=='character-accent'/);
  assert.match(primaryColorHandler, /material\.color\.set\(e\.target\.value\)/);
});

test('excluir cadastro do catálogo persiste a alteração no projeto', () => {
  const handlerStart = html.indexOf("deleteButton.onclick = () => {");
  const handlerEnd = html.indexOf("container.appendChild(row);", handlerStart);
  assert.ok(handlerStart >= 0 && handlerEnd > handlerStart, 'ação de excluir cadastro não encontrada');
  const deleteHandler = html.slice(handlerStart, handlerEnd);
  assert.match(deleteHandler, /removeCharacter\(record\.id\)/);
  assert.match(deleteHandler, /Estudio3DCore\.saveProject\(\)/);
  assert.match(deleteHandler, /!saved\.ok/);
});
