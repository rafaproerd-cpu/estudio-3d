const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadCharacterSystem() {
  const window = {
    crypto: { randomUUID: () => 'test-character-id' },
    console
  };
  const context = vm.createContext({ window, console });
  for (const file of ['estudio-core.js', 'character-system.js']) {
    const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    vm.runInContext(source, context, { filename: file });
  }
  return window;
}

test('carrega os módulos centrais e registra as categorias previstas', () => {
  const window = loadCharacterSystem();
  const info = window.Estudio3DCharacters.getSystemInfo();

  assert.equal(window.Estudio3DCore.version, '1.0.1');
  assert.equal(info.name, 'Estudio3DCharacters');
  for (const category of ['human', 'animal', 'creature', 'robot', 'alien', 'object']) {
    assert.ok(info.categories.includes(category), 'categoria ausente: ' + category);
  }
});

test('cadastra personagem com valores padrão e mantém os dados no projeto', () => {
  const window = loadCharacterSystem();
  const character = window.Estudio3DCharacters.addCharacterToProject({
    name: 'Raquel',
    category: 'human',
    ageStage: 'adult',
    rigType: 'humanoid'
  });

  assert.equal(character.name, 'Raquel');
  assert.equal(character.visualDirection.style, 'definido pelo contexto');
  assert.equal(window.Estudio3DCharacters.getCharacter(character.id).name, 'Raquel');
  assert.equal(window.Estudio3DCharacters.getCharacters().length, 1);
});

test('rejeita personagem sem nome e identificador duplicado', () => {
  const window = loadCharacterSystem();
  assert.throws(
    () => window.Estudio3DCharacters.addCharacterToProject({ name: '   ' }),
    /nome/i
  );

  window.Estudio3DCharacters.addCharacterToProject({
    id: 'duplicado',
    name: 'Primeiro'
  });
  assert.throws(
    () => window.Estudio3DCharacters.addCharacterToProject({
      id: 'duplicado',
      name: 'Segundo'
    }),
    /identificador/i
  );
});

test('atualiza personagem sem apagar metadados não alterados', () => {
  const window = loadCharacterSystem();
  const api = window.Estudio3DCharacters;
  const created = api.addCharacterToProject({
    name: 'Raquel',
    gameReady: { intendedForGames: true, targetEngine: 'Godot' },
    model: { format: 'glb', hasTextures: true },
    parts: { head: 'head-asset', clothing: 'coat-asset' },
    visualDirection: { style: '3D estilizado semi-realista', mood: 'calma' }
  });

  const updated = api.updateCharacter(created.id, {
    name: 'Raquel Silva',
    visualDirection: { mood: 'alegre' },
    parts: { hair: 'hair-asset' }
  });

  assert.equal(updated.name, 'Raquel Silva');
  assert.equal(updated.visualDirection.style, '3D estilizado semi-realista');
  assert.equal(updated.visualDirection.mood, 'alegre');
  assert.equal(updated.gameReady.targetEngine, 'Godot');
  assert.equal(updated.model.format, 'glb');
  assert.equal(updated.parts.head, 'head-asset');
  assert.equal(updated.parts.clothing, 'coat-asset');
  assert.equal(updated.parts.hair, 'hair-asset');
});

test('remove personagem existente e informa quando ele não existe', () => {
  const window = loadCharacterSystem();
  const api = window.Estudio3DCharacters;
  const character = api.addCharacterToProject({ name: 'Teste' });

  assert.equal(api.removeCharacter(character.id), true);
  assert.equal(api.removeCharacter(character.id), false);
  assert.equal(api.getCharacters().length, 0);
});

test('mantém aparência estruturada e mescla ajustes sem apagar detalhes', () => {
  const window = loadCharacterSystem();
  const api = window.Estudio3DCharacters;
  const created = api.addCharacterToProject({
    name: 'Luna',
    appearance: {
      body: { height: 1.7, build: 'atlética' },
      face: { eyeShape: 'amendoado', nose: 'pequeno' },
      hair: { style: 'cacheado', color: 'castanho' },
      wardrobe: { outfit: 'jaqueta' },
      colors: { skin: '#b87954' },
      features: ['sardas', 'covinha'],
      notes: 'Personagem de aventura'
    }
  });

  const updated = api.updateCharacter(created.id, {
    appearance: {
      face: { eyeColor: 'verde' },
      hair: { color: 'preto' },
      features: ['sardas', 'cicatriz']
    }
  });

  assert.equal(updated.appearance.body.height, 1.7);
  assert.equal(updated.appearance.face.eyeShape, 'amendoado');
  assert.equal(updated.appearance.face.eyeColor, 'verde');
  assert.equal(updated.appearance.hair.style, 'cacheado');
  assert.equal(updated.appearance.hair.color, 'preto');
  assert.equal(updated.appearance.wardrobe.outfit, 'jaqueta');
  assert.equal(updated.appearance.colors.skin, '#b87954');
  assert.deepEqual(Array.from(updated.appearance.features), ['sardas', 'cicatriz']);
  assert.equal(updated.appearance.notes, 'Personagem de aventura');
});
