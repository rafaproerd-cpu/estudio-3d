
/**
 * ESTÚDIO 3D — NÚCLEO CENTRAL
 * Versão 1.0.0
 */
(function (global) {
  'use strict';

  if (global.Estudio3DCore) return;

  const VERSION = '1.0.0';
  const STORAGE_KEY = 'estudio3d.project.v1';

  const modules = new Map();
  const listeners = new Map();
  const adapters = new Map();

  function createId() {
    return global.crypto?.randomUUID?.() ||
      'est3d-' + Date.now() + '-' + Math.random().toString(36).slice(2);
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  const project = {
    id: createId(),
    name: 'Meu projeto',
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    characters: [],
    scenes: [],
    assets: [],
    settings: {}
  };

  function emit(event, data) {
    (listeners.get(event) || []).forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('[Estúdio 3D]', error);
      }
    });
  }

  function on(event, callback) {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event).add(callback);
    return () => listeners.get(event)?.delete(callback);
  }

  function registerModule(name, info = {}) {
    if (modules.has(name)) throw new Error('Módulo já registrado: ' + name);

    const module = Object.freeze({
      name,
      title: info.title || name,
      version: info.version || VERSION,
      status: info.status || 'planned',
      description: info.description || ''
    });

    modules.set(name, module);
    emit('module:registered', module);
    return module;
  }

  function getModules() {
    return Array.from(modules.values()).map(item => ({ ...item }));
  }

  function registerAdapter(type, adapter) {
    if (!adapter || typeof adapter.run !== 'function') {
      throw new Error('Adaptador inválido.');
    }
    adapters.set(type, adapter);
    emit('adapter:registered', { type });
  }

  async function runTask(type, input, context = {}) {
    const adapter = adapters.get(type);
    if (!adapter) {
      throw new Error('Serviço ainda não conectado: ' + type);
    }

    emit('task:started', { type, input });

    try {
      const result = await adapter.run(input, context);
      emit('task:completed', { type, result });
      return result;
    } catch (error) {
      emit('task:failed', { type, error });
      throw error;
    }
  }

  function getProject() {
    return clone(project);
  }

  function updateProject(updates) {
    if (!updates || typeof updates !== 'object') {
      throw new Error('Alterações inválidas.');
    }

    ['id', 'createdAt', 'version'].forEach(key => delete updates[key]);

    Object.assign(project, clone(updates));
    project.updatedAt = new Date().toISOString();
    emit('project:updated', getProject());
    return getProject();
  }

  function saveProject() {
    try {
      project.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
      emit('project:saved', getProject());
      return { ok: true, message: 'Projeto salvo neste navegador.' };
    } catch (error) {
      console.error(error);
      return { ok: false, message: 'Não foi possível salvar o projeto.' };
    }
  }

  function loadProject() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ok: false, message: 'Nenhum projeto salvo.' };

      const saved = JSON.parse(raw);
      if (!saved || !saved.id) throw new Error('Projeto inválido.');

      Object.assign(project, saved);
      emit('project:loaded', getProject());
      return { ok: true, project: getProject() };
    } catch (error) {
      console.error(error);
      return { ok: false, message: 'Erro ao carregar projeto.' };
    }
  }

  function exportProject() {
    return JSON.stringify(getProject(), null, 2);
  }

  function importProject(jsonText) {
    const imported = JSON.parse(jsonText);

    if (!imported ||
        !Array.isArray(imported.characters) ||
        !Array.isArray(imported.scenes) ||
        !Array.isArray(imported.assets)) {
      throw new Error('Arquivo de projeto incompatível.');
    }

    Object.assign(project, imported, {
      id: createId(),
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    emit('project:imported', getProject());
    return getProject();
  }

  const core = Object.freeze({
    version: VERSION,
    on,
    emit,
    registerModule,
    getModules,
    registerAdapter,
    runTask,
    getProject,
    updateProject,
    saveProject,
    loadProject,
    exportProject,
    importProject
  });

  Object.defineProperty(global, 'Estudio3DCore', {
    value: core,
    writable: false
  });

  const plannedModules = [
    ['characters', 'Personagens', 'Humanos, crianças, adolescentes, idosos, animais e criaturas.'],
    ['customizer', 'Personalização', 'Rosto, corpo, cabelo, roupas e expressões.'],
    ['assets', 'Biblioteca 3D', 'Importação e organização de modelos e objetos.'],
    ['animation', 'Animações', 'Movimentos, rigging e interações.'],
    ['scenes', 'Cenários', 'Ambientes, iluminação e câmeras.'],
    ['storytelling', 'Histórias', 'Roteiros, diálogos e sequências de cenas.'],
    ['ai', 'Inteligência artificial', 'Integração de Claude e outros provedores por adaptadores.'],
    ['render', 'Renderização', 'Exportação de imagens, vídeos e projetos.']
  ];

  plannedModules.forEach(([name, title, description]) => {
    registerModule(name, { title, description, status: 'planned' });
  });

  console.info('[Estúdio 3D] Núcleo central carregado:', VERSION);
})(window);
