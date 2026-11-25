/**
 * Estúdio 3D — modelo universal de personagem (Fase A)
 * Módulo independente do visualizador. Não gera malhas nem promete rig/exportação.
 */

const clone = (value) => {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
};

const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

export const CHARACTER_SCHEMA_VERSION = 1;

export function createCharacter(overrides = {}) {
  const base = {
    id: globalThis.crypto?.randomUUID?.() ?? `character-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    schemaVersion: CHARACTER_SCHEMA_VERSION,
    identity: {
      name: "Novo personagem",
      category: "human",
      species: "",
      lifeStage: "",
      description: "",
      tags: []
    },
    anatomy: {
      baseType: "humanoid",
      proportions: {},
      limbs: [],
      joints: [],
      specialFeatures: []
    },
    appearance: {
      body: {},
      face: {
        shape: "",
        eyes: {},
        eyebrows: {},
        noseOrMuzzle: {},
        mouth: {},
        ears: {},
        expressions: []
      },
      hair: {},
      wardrobe: {},
      colors: {},
      materials: {},
      features: [],
      notes: ""
    },
    parts: {
      head: null,
      body: null,
      hair: null,
      clothing: [],
      accessories: [],
      special: []
    },
    animation: {
      rigType: "unknown",
      skeleton: null,
      clips: [],
      facialControls: []
    },
    export: {
      preferredFormat: "",
      target: "",
      units: "meters"
    }
  };

  return mergePreservingUnknown(base, overrides);
}

/**
 * Merge recursivo: atualiza somente os campos fornecidos e preserva
 * propriedades legadas ou futuras que não estejam no objeto-base.
 */
export function mergePreservingUnknown(base, incoming) {
  if (!isObject(base) || !isObject(incoming)) {
    return incoming === undefined ? clone(base) : clone(incoming);
  }
  const result = clone(base);
  for (const [key, value] of Object.entries(incoming)) {
    result[key] = key in base && isObject(base[key]) && isObject(value)
      ? mergePreservingUnknown(base[key], value)
      : clone(value);
  }
  return result;
}

/**
 * Migra registros antigos sem descartar appearance.body/face/hair/wardrobe,
 * appearance.colors ou parts já existentes.
 */
export function migrateCharacter(record = {}) {
  const source = isObject(record) ? record : {};
  const migrated = createCharacter(source);
  migrated.schemaVersion = CHARACTER_SCHEMA_VERSION;

  // Compatibilidade explícita com os campos usados pelo protótipo anterior.
  if (isObject(source.appearance)) {
    for (const key of ["body", "face", "hair", "wardrobe", "colors"]) {
      if (key in source.appearance) migrated.appearance[key] = clone(source.appearance[key]);
    }
  }
  if (isObject(source.parts)) {
    migrated.parts = mergePreservingUnknown(migrated.parts, source.parts);
  }

  return migrated;
}

export function validateCharacter(character) {
  const errors = [];
  if (!isObject(character)) {
    return { valid: false, errors: ["O personagem precisa ser um objeto."] };
  }
  if (typeof character.id !== "string" || !character.id.trim()) {
    errors.push("O campo id precisa ser um texto não vazio.");
  }
  if (!isObject(character.identity)) {
    errors.push("O grupo identity é obrigatório.");
  } else {
    if (typeof character.identity.name !== "string" || !character.identity.name.trim()) {
      errors.push("O nome do personagem é obrigatório.");
    }
    if (typeof character.identity.category !== "string" || !character.identity.category.trim()) {
      errors.push("A categoria do personagem é obrigatória.");
    }
    if (character.identity.tags !== undefined && !Array.isArray(character.identity.tags)) {
      errors.push("identity.tags precisa ser uma lista.");
    }
  }
  if (!isObject(character.appearance)) errors.push("O grupo appearance precisa ser um objeto.");
  if (!isObject(character.parts)) errors.push("O grupo parts precisa ser um objeto.");
  return { valid: errors.length === 0, errors };
}

export function serializeCharacter(character) {
  const migrated = migrateCharacter(character);
  const result = validateCharacter(migrated);
  if (!result.valid) {
    throw new TypeError(`Personagem inválido: ${result.errors.join(" ")}`);
  }
  return JSON.stringify(migrated, null, 2);
}
