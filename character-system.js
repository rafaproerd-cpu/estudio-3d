
/**
 * ESTÚDIO 3D — SISTEMA DE PERSONAGENS
 * Versão 1.1.0
 */
(function (global) {
  'use strict';

  if (global.Estudio3DCharacters) return;

  const core = global.Estudio3DCore;

  if (!core) {
    console.error('[Estúdio 3D] Carregue estudio-core.js antes de character-system.js.');
    return;
  }

  const VERSION = '1.1.0';

  const categories = Object.freeze([
    'human', 'animal', 'creature', 'robot', 'alien', 'object', 'other'
  ]);

  const ageStages = Object.freeze([
    'baby', 'child', 'teen', 'adult', 'senior', 'not_applicable'
  ]);

  const rigTypes = Object.freeze([
    'humanoid', 'quadruped', 'avian', 'custom', 'none', 'unknown'
  ]);

  const partNames = Object.freeze([
    'head', 'body', 'hair', 'clothing', 'accessories',
    'hands', 'feet', 'tail', 'wings', 'other'
  ]);

  function createId() {
    return global.crypto && typeof global.crypto.randomUUID === 'function'
      ? global.crypto.randomUUID()
      : 'character-' + Date.now() + '-' +
        Math.random().toString(36).slice(2, 10);
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function cleanText(value, fallback = '') {
    return typeof value === 'string' ? value.trim() : fallback;
  }

  function createVisualDirection(options = {}) {
    return {
      style: cleanText(options.style, 'definido pelo contexto'),
      description: cleanText(options.description),
      context: cleanText(options.context),
      mood: cleanText(options.mood),
      audience: cleanText(options.audience),
      referencePrompt: cleanText(options.referencePrompt),
      consistencyGroup: cleanText(options.consistencyGroup),
      traits: Array.isArray(options.traits)
        ? options.traits
            .filter(item => typeof item === 'string')
            .map(item => item.trim())
            .filter(Boolean)
        : [],
      intensity: Number.isFinite(options.intensity)
        ? Math.max(0, Math.min(1, options.intensity))
        : 0.5
    };
  }

  function createCharacter(options = {}) {
    const now = new Date().toISOString();

    return {
      id: cleanText(options.id) || createId(),
      name: cleanText(options.name, 'Novo personagem'),
      category: categories.includes(options.category)
        ? options.category : 'human',
      ageStage: ageStages.includes(options.ageStage)
        ? options.ageStage : 'adult',
      rigType: rigTypes.includes(options.rigType)
        ? options.rigType : 'unknown',
      description: cleanText(options.description),

      visualDirection: createVisualDirection(
        options.visualDirection || {}
      ),

      parts: options.parts && typeof options.parts === 'object'
        ? clone(options.parts)
        : {},

      gameReady: {
        intendedForGames: Boolean(
          options.gameReady && options.gameReady.intendedForGames
        ),
        targetEngine: cleanText(
          options.gameReady && options.gameReady.targetEngine
        ),
        rigged: Boolean(options.gameReady && options.gameReady.rigged),
        animated: Boolean(options.gameReady && options.gameReady.animated),
        lodAvailable: Boolean(
          options.gameReady && options.gameReady.lodAvailable
        ),
        optimizationNotes: cleanText(
          options.gameReady && options.gameReady.optimizationNotes
        )
      },

      model: {
        source: cleanText(
          options.model && options.model.source,
          'created_in_studio'
        ),
        format: cleanText(options.model && options.model.format),
        assetId: cleanText(options.model && options.model.assetId),
        hasTextures: Boolean(options.model && options.model.hasTextures),
        hasMaterials: Boolean(options.model && options.model.hasMaterials)
      },

      tags: Array.isArray(options.tags)
        ? options.tags
            .filter(item => typeof item === 'string')
            .map(item => item.trim())
            .filter(Boolean)
        : [],

      createdAt: cleanText(options.createdAt, now),
      updatedAt: now
    };
  }

  function validateCharacter(character) {
    const errors = [];

    if (!character || typeof character !== 'object') {
      return { valid: false, errors: ['Personagem inválido.'] };
    }

    if (!cleanText(character.name)) {
      errors.push('O personagem precisa de um nome.');
    }

    if (!categories.includes(character.category)) {
      errors.push('Categoria de personagem inválida.');
    }

    if (!ageStages.includes(character.ageStage)) {
      errors.push('Faixa etária inválida.');
    }

    if (!rigTypes.includes(character.rigType)) {
      errors.push('Tipo de rig inválido.');
    }

    if (!character.visualDirection ||
        typeof character.visualDirection !== 'object') {
      errors.push('A direção visual precisa ser válida.');
    }

    return { valid: errors.length === 0, errors };
  }

  function getCharacters() {
    const project = core.getProject();
    return Array.isArray(project.characters) ? project.characters : [];
  }

  function getCharacter(id) {
    return getCharacters().find(character => character.id === id) || null;
  }

  function addCharacterToProject(options = {}) {
    const character = createCharacter(options);
    const validation = validateCharacter(character);

    if (!validation.valid) {
      throw new Error(validation.errors.join(' '));
    }

    const characters = getCharacters();

    if (characters.some(item => item.id === character.id)) {
      throw new Error('Já existe um personagem com esse identificador.');
    }

    core.updateProject({
      characters: [...characters, character]
    });

    core.emit('character:created', clone(character));
    return clone(character);
  }

  function updateCharacter(id, updates = {}) {
    if (!id) {
      throw new Error('Identificador do personagem não informado.');
    }

    const characters = getCharacters();
    const index = characters.findIndex(item => item.id === id);

    if (index < 0) {
      throw new Error('Personagem não encontrado.');
    }

    const current = characters[index];
    const safeUpdates = clone(updates);

    delete safeUpdates.id;
    delete safeUpdates.createdAt;

    const updated = {
      ...current,
      ...safeUpdates,

      visualDirection: safeUpdates.visualDirection
        ? createVisualDirection({
            ...current.visualDirection,
            ...safeUpdates.visualDirection
          })
        : current.visualDirection,

      gameReady: safeUpdates.gameReady
        ? { ...current.gameReady, ...safeUpdates.gameReady }
        : current.gameReady,

      model: safeUpdates.model
        ? { ...current.model, ...safeUpdates.model }
        : current.model,

      parts: safeUpdates.parts
        ? { ...current.parts, ...safeUpdates.parts }
        : current.parts,

      updatedAt: new Date().toISOString()
    };

    const validation = validateCharacter(updated);

    if (!validation.valid) {
      throw new Error(validation.errors.join(' '));
    }

    const next = characters.slice();
    next[index] = updated;

    core.updateProject({ characters: next });
    core.emit('character:updated', clone(updated));

    return clone(updated);
  }

  function removeCharacter(id) {
    const characters = getCharacters();
    const character = characters.find(item => item.id === id);

    if (!character) return false;

    core.updateProject({
      characters: characters.filter(item => item.id !== id)
    });

    core.emit('character:removed', {
      id,
      character: clone(character)
    });

    return true;
  }

  function getVisualGroups() {
    const groups = new Map();

    getCharacters().forEach(character => {
      const key = character.visualDirection &&
        character.visualDirection.consistencyGroup
        ? character.visualDirection.consistencyGroup
        : 'sem-grupo';

      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(character);
    });

    return Array.from(groups.entries()).map(([name, characters]) => ({
      name,
      characters: clone(characters)
    }));
  }

  function getSystemInfo() {
    return {
      name: 'Estudio3DCharacters',
      version: VERSION,
      categories: categories.slice(),
      ageStages: ageStages.slice(),
      rigTypes: rigTypes.slice(),
      partNames: partNames.slice(),

      capabilities: [
        'character_metadata',
        'contextual_visual_direction',
        'separate_character_parts',
        'game_export_metadata'
      ],

      limitations: [
        'Não gera geometria 3D.',
        'Não cria rigging ou animações.',
        'Não exporta arquivos 3D diretamente nesta versão.'
      ]
    };
  }

  const api = Object.freeze({
    version: VERSION,
    categories,
    ageStages,
    rigTypes,
    partNames,
    createVisualDirection,
    createCharacter,
    validateCharacter,
    addCharacterToProject,
    getCharacters,
    getCharacter,
    updateCharacter,
    removeCharacter,
    getVisualGroups,
    getSystemInfo
  });

  Object.defineProperty(global, 'Estudio3DCharacters', {
    value: api,
    writable: false,
    configurable: false
  });

  core.emit('module:ready', {
    name: 'characters',
    version: VERSION,
    status: 'ready'
  });

  console.info(
    '[Estúdio 3D] Sistema de personagens carregado:',
    VERSION
  );

})(window);
