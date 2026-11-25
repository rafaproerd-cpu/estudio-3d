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
  assert.match(html, /ageScale\[record\.ageStage\] \|\| 1/);
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
  assert.ok(deleteHandler.includes('status(saved.ok'), 'resultado do salvamento deve ser informado');
});

test('protótipo restaura escala, posição e rotação salvas no cadastro', () => {
  const start = html.indexOf('function generateCharacterPrototype(');
  const end = html.indexOf("document.querySelector('#generateCharacter3D').onclick", start);
  assert.ok(start >= 0 && end > start, 'geração procedural não encontrada');
  const generator = html.slice(start, end);
  assert.match(generator, /savedBody\.editorScale/);
  assert.match(generator, /savedBody\.editorPositionX/);
  assert.match(generator, /savedBody\.editorRotationY/);
  assert.match(generator, /group\.position\.set\(/);
  assert.match(generator, /group\.rotation\.y = Number\.isFinite\(savedEditorRotationY\)/);
  assert.match(generator, /THREE\.MathUtils\.degToRad\(savedEditorRotationY\)/);
  assert.match(generator, /savedEditorScale > 0/);
});


test('seleção no catálogo não troca a associação do personagem ativo na cena', () => {
  assert.ok(html.includes('let characterRecordId=null;'));
  assert.ok(html.includes('let selectedCatalogRecordId=null;'));
  const catalogStart = html.indexOf('function renderCharacterCatalog()');
  const catalogEnd = html.indexOf("document.querySelector('#newCharacterRecord')", catalogStart);
  const catalog = html.slice(catalogStart, catalogEnd);
  assert.match(catalog, /record.id === selectedCatalogRecordId/);
  assert.match(catalog, /selectedCatalogRecordId = record.id/);
  assert.doesNotMatch(catalog, /characterRecordId = record.id/);
});

test('salvar cadastro e gerar protótipo usam o cadastro selecionado separadamente da cena', () => {
  const saveStart = html.indexOf("document.querySelector('#saveCharacterData')");
  const generateStart = html.indexOf('function generateCharacterPrototype(');
  const persistStart = html.indexOf('function persistSelectedCharacter(patch)');
  const saveHandler = html.slice(saveStart, generateStart);
  const generator = html.slice(generateStart, persistStart);
  assert.match(saveHandler, /selectedCatalogRecordId, getCharacterFormData\(\)/);
  assert.match(generator, /getCharacter\(selectedCatalogRecordId\)/);
  assert.match(generator, /characterRecordId = selectedCatalogRecordId/);
  assert.match(html, /updateCharacter\(characterRecordId, patch\)/);
});


test('gerar protótipo procedural limpa ações de animação do modelo anterior', () => {
  const start = html.indexOf('function generateCharacterPrototype(');
  const end = html.indexOf("document.querySelector('#generateCharacter3D').onclick", start);
  const generator = html.slice(start, end);
  assert.match(generator, /if \(mixer\) mixer\.stopAllAction\(\)/);
  assert.match(generator, /mixer = null/);
  assert.match(generator, /activeAction = null/);
  assert.match(generator, /animationActions = \[\]/);
  assert.match(generator, /#animationSelect/);
  assert.match(generator, /#animate/);
  assert.match(generator, /#pauseAnimation/);
});


test('exportação JSON inclui o catálogo completo de personagens', () => {
  const start = html.indexOf('function saveProject()');
  const end = html.indexOf("document.querySelector('#export').onclick", start);
  const exporter = html.slice(start, end);
  assert.match(exporter, /version:4/);
  assert.match(exporter, /characters: catalog/);
  assert.match(exporter, /window\.Estudio3DCharacters\.getCharacters\(\)/);
  assert.match(exporter, /getCharacters\(\)/);
  assert.match(exporter, /character: characterData \? \{/);
});

test('importação valida e restaura o catálogo inteiro preservando IDs', () => {
  const start = html.lastIndexOf("document.querySelector('#file').onchange");
  const end = html.indexOf('/* CÂMERA E SELEÇÃO */', start);
  const importer = html.slice(start, end);
  assert.match(importer, /\[2,3,4\]/);
  assert.match(importer, /Array\.isArray\(data\.characters\)/);
  assert.match(importer, /createCharacter\(source\)/);
  assert.match(importer, /validateCharacter\(normalized\)/);
  assert.match(importer, /new Set\(ids\)\.size !== ids\.length/);
  assert.match(importer, /updateProject\(\{ characters: normalizedRecords \}\)/);
  assert.match(importer, /getCharacter\(imported\.id\)/);
  assert.match(importer, /addCharacterToProject\(\{ \.\.\.patch, id: imported\.id \}\)/);
});

test('importação pendente antes do carregamento do GLB não duplica cadastro', () => {
  const start = html.indexOf('function loadCharacter()');
  const end = html.indexOf('/* OBJETOS */', start);
  const loader = html.slice(start, end);
  assert.match(loader, /const existingImported = imported\.id \? api\.getCharacter\(imported\.id\) : null/);
  assert.match(loader, /api\.updateCharacter\(imported\.id, importedData\)/);
  assert.match(loader, /api\.addCharacterToProject\(importedData\)/);
});


test('importação rejeita cadastros inválidos e mantém ID gerado para formato antigo', () => {
  const start = html.lastIndexOf("document.querySelector('#file').onchange");
  const end = html.indexOf('/* CÂMERA E SELEÇÃO */', start);
  const importer = html.slice(start, end);
  assert.match(importer, /!source \|\| typeof source !== 'object' \|\| Array\.isArray\(source\)/);
  assert.match(importer, /data\.character\.record\.id = normalized\.id/);
});


test('estado local da cena salva personagem ativo, cenário, luz e objetos', () => {
  const start = html.indexOf('function persistEditorState()');
  const end = html.indexOf('function restoreEditorState(editorState)', start);
  const saver = html.slice(start, end);
  assert.match(saver, /activeCharacter/);
  assert.match(saver, /characterRecordId/);
  assert.match(saver, /position: character\.position\.toArray\(\)/);
  assert.match(saver, /settings: \{ \.\.\.\(project\.settings \|\| \{\}\), editorState \}/);
  assert.match(saver, /core\.saveProject\(\)/);
  assert.match(saver, /background:/);
  assert.match(saver, /light:/);
  assert.match(saver, /objects: objects\.filter/);
});

test('restauração local valida e reconstrói objetos e configurações da cena', () => {
  const start = html.indexOf('function restoreEditorState(editorState)');
  const end = html.indexOf('/* CARREGAMENTO DO PERSONAGEM */', start);
  const restore = html.slice(start, end);
  assert.match(restore, /editorState\.background/);
  assert.match(restore, /editorState\.light/);
  assert.match(restore, /Array\.isArray\(editorState\.objects\)/);
  assert.match(restore, /\['box', 'sphere', 'cylinder', 'torus'\]/);
  assert.match(restore, /addObject\(item\.type, false\)/);
  assert.match(restore, /item\.position\.every\(Number\.isFinite\)/);
});

test('carregamento local seleciona personagem salvo e reconstrói preview procedural', () => {
  const start = html.indexOf('function loadCharacter()');
  const end = html.indexOf('/* OBJETOS */', start);
  const loader = html.slice(start, end);
  assert.match(loader, /settings \|\| \{\}\)\.editorState/);
  assert.match(loader, /savedEditorState\.activeCharacter\.id/);
  assert.match(loader, /savedActive\.model\.source === 'procedural_preview'/);
  assert.match(loader, /restoreEditorState\(savedEditorState\)/);
  assert.match(loader, /persistEditorState\(\)/);
});


test('cena salva intencionalmente sem personagem não carrega GLB-base ao reabrir', () => {
  const saverStart = html.indexOf('function persistEditorState()');
  const saverEnd = html.indexOf('function restoreEditorState(editorState)', saverStart);
  const saver = html.slice(saverStart, saverEnd);
  assert.match(saver, /hasCharacter: !!activeCharacter/);
  const loaderStart = html.indexOf('function loadCharacter()');
  const loaderEnd = html.indexOf('/* OBJETOS */', loaderStart);
  const loader = html.slice(loaderStart, loaderEnd);
  assert.match(loader, /startupEditorState\.hasCharacter === false/);
  assert.match(loader, /restoreEditorState\(startupEditorState\)/);
  assert.match(loader, /return;/);
});


test('personagem rigged restaura posição, rotação e escala salvas localmente', () => {
  const start = html.indexOf('function loadCharacter()');
  const end = html.indexOf('/* OBJETOS */', start);
  const loader = html.slice(start, end);
  assert.match(loader, /if \(!restoreProcedural && restoredProceduralTransform\)/);
  assert.match(loader, /character\.position\.fromArray\(t\.position\)/);
  assert.match(loader, /character\.rotation\.fromArray\(t\.rotation\)/);
  assert.match(loader, /character\.scale\.fromArray\(t\.scale\)/);
});


test('importar projeto sem personagem remove o personagem anterior da cena', () => {
  const start = html.lastIndexOf("document.querySelector('#file').onchange");
  const end = html.indexOf('/* CÂMERA E SELEÇÃO */', start);
  const importer = html.slice(start, end);
  assert.match(importer, /if \(!data\.character && character\)/);
  assert.match(importer, /scene\.remove\(character\)/);
  assert.match(importer, /characterRecordId = null/);
  assert.match(importer, /selectedCatalogRecordId = null/);
  assert.match(importer, /mixer\.stopAllAction\(\)/);
});


test('preview procedural salvo é restaurado sem carregar o GLB-base', () => {
  const start = html.indexOf('function loadCharacter()');
  const end = html.indexOf('/* OBJETOS */', start);
  const loader = html.slice(start, end);
  assert.match(loader, /savedRecord\.model\.source === 'procedural_preview'/);
  assert.match(loader, /restoreEditorState\(startupEditorState\)/);
  assert.match(loader, /generateCharacterPrototype\(\)/);
  assert.match(loader, /Personagem procedural e cena restaurados sem depender do arquivo GLB-base/);
  assert.ok(loader.indexOf("status('Personagem procedural") < loader.indexOf('const loader=new GLTFLoader()'));
});


test('importação valida catálogo e transformações antes de modificar a cena', () => {
  const start = html.lastIndexOf("document.querySelector('#file').onchange");
  const end = html.indexOf('/* CÂMERA E SELEÇÃO */', start);
  const importer = html.slice(start, end);
  const validationEnd = importer.indexOf('// Um projeto sem personagem ativo');
  const validation = importer.slice(0, validationEnd);
  const sceneMutation = importer.indexOf('scene.remove(character)');
  const objectMutation = importer.indexOf('objects.filter(o=>!o.userData.isCharacter)');
  assert.ok(validationEnd > 0);
  assert.ok(sceneMutation > validationEnd);
  assert.ok(objectMutation > validationEnd);
  assert.match(validation, /normalizedRecords = sourceRecords\.map/);
  assert.match(validation, /validateCharacter\(normalized\)/);
  assert.match(validation, /new Set\(ids\)\.size !== ids\.length/);
  assert.match(validation, /item\[key\]\.every\(Number\.isFinite\)/);
  assert.match(validation, /O projeto contém uma cor inválida/);
});

test('catálogo validado é aplicado sem repetir a normalização depois da troca da cena', () => {
  const start = html.lastIndexOf("document.querySelector('#file').onchange");
  const end = html.indexOf('/* CÂMERA E SELEÇÃO */', start);
  const importer = html.slice(start, end);
  assert.match(importer, /if \(normalizedRecords && window\.Estudio3DCore\)/);
  assert.match(importer, /updateProject\(\{ characters: normalizedRecords \}\)/);
  assert.doesNotMatch(importer, /const normalizedRecords = sourceRecords\.map/);
});


test('interface permite importar modelos GLB externos', () => {
  assert.match(html, /id="importGLB"/);
  assert.match(html, /id="glbFile" accept="\.glb,model\/gltf-binary"/);
  assert.match(html, /document\.querySelector\('#glbFile'\)\.onchange/);
  assert.match(html, /loader\.parse\(buffer, ''/);
  assert.match(html, /source: 'external_file'/);
  assert.match(html, /fileName: file\.name/);
  assert.match(html, /embedded: false/);
});

test('exportação JSON inclui manifesto de arquivos 3D externos', () => {
  const start = html.indexOf('function saveProject()');
  const end = html.indexOf("document.querySelector('#export').onclick", start);
  assert.ok(start >= 0 && end > start, 'função de exportação do projeto não encontrada');
  const exporter = html.slice(start, end);
  assert.match(exporter, /assetManifest:/);
  assert.match(exporter, /characterId: record\.id/);
  assert.match(exporter, /fileName: record\.model\.fileName \|\| record\.model\.assetId/);
  assert.match(exporter, /embedded: false/);
  assert.match(exporter, /required: true/);
});


test('exportação de pacote ZIP inclui projeto e modelos GLB externos', () => {
  assert.match(html, /id="exportBundle"/);
  assert.match(html, /jszip@3\.10\.1/);
  assert.match(html, /const externalModelAssets = new Map\(\)/);
  assert.match(html, /externalModelAssets\.set\(record\.id, \{ fileName: file\.name, data: buffer \}\)/);
  assert.match(html, /new window\.JSZip\(\)/);
  assert.match(html, /zip\.file\('project\.json'/);
  assert.match(html, /zip\.file\(archivePath, stored\.data\)/);
  assert.match(html, /archivePath, embedded: true/);
});

test('pacote ZIP não é criado quando faltam binários GLB obrigatórios', () => {
  assert.match(html, /const missingAssets = requiredAssets\.filter\(asset => !externalModelAssets\.has\(asset\.characterId\)\)/);
  assert.match(html, /Antes de criar o pacote, importe novamente estes modelos GLB/);
});


test('interface oferece importação de pacote ZIP completo', () => {
  assert.match(html, /id="importBundle"/);
  assert.match(html, /id="bundleFile" accept="\.zip/);
  assert.match(html, /document\.querySelector\('#bundleFile'\)\.onchange/);
  assert.match(html, /JSZip\.loadAsync\(file, \{ checkCRC32: true \}\)/);
  assert.match(html, /project\.json/);
  assert.match(html, /parseGLBBuffer\(buffer\)/);
});

test('importação ZIP valida caminhos, tamanhos e manifesto antes de alterar a cena', () => {
  const handlerStart = html.indexOf("document.querySelector('#bundleFile').onchange = async");
  const handlerEnd = html.indexOf("document.querySelector('#file').onchange=async", handlerStart);
  assert.ok(handlerStart >= 0 && handlerEnd > handlerStart, 'importador ZIP não encontrado');
  const handler = html.slice(handlerStart, handlerEnd);
  assert.match(handler, /file\.size > 150 \* 1024 \* 1024/);
  assert.match(handler, /name\.split\('\/'\)\.some\(part => part === '\.\.' \|\| part === '\.'\)/);
  assert.match(handler, /buffer\.byteLength > 100 \* 1024 \* 1024/);
  assert.match(handler, /totalAssetBytes > 250 \* 1024 \* 1024/);
  assert.ok(handler.indexOf('await parseGLBBuffer(buffer)') < handler.indexOf("document.querySelector('#file').onchange({"), 'GLB deve ser validado antes de importar o projeto');
});

test('validador GLB exige assinatura, versão e tamanho binário coerentes', () => {
  const start = html.indexOf('function parseGLBBuffer(buffer)');
  const end = html.indexOf("document.querySelector('#bundleFile').onchange", start);
  const validator = html.slice(start, end);
  assert.match(validator, /0x46546c67/);
  assert.match(validator, /getUint32\(4, true\) !== 2/);
  assert.match(validator, /getUint32\(8, true\) !== buffer\.byteLength/);
  assert.match(validator, /new GLTFLoader\(\)\.parse/);
});

test('importação ZIP protege contra conteúdo descompactado excessivo e restaura protótipo procedural', () => {
  assert.match(html, /declaredArchiveBytes > 300 \* 1024 \* 1024/);
  assert.match(html, /entry\._data\.uncompressedSize > 100 \* 1024 \* 1024/);
  assert.match(html, /project\.character\.record\.model\.source === 'procedural_preview'/);
  assert.match(html, /generateCharacterPrototype\(\)/);
});


test('importação de projeto impede que o carregamento inicial do GLB sobrescreva a cena', () => {
  assert.match(html, /let projectImportRevision = 0/);
  assert.match(html, /const loadRevision = projectImportRevision/);
  assert.match(html, /if \(loadRevision !== projectImportRevision\) return/);
  assert.match(html, /projectImportRevision \+= 1/);
});


test('manifesto ZIP vincula cada GLB ao ID correto e exige todos os modelos externos', () => {
  assert.match(html, /asset\.archivePath\.startsWith\('assets\/' \+ safeCharacterId \+ '\/'\)/);
  assert.match(html, /manifestPaths\.has\(asset\.archivePath\)/);
  assert.match(html, /externalRecords\.some\(record => !manifestIds\.has\(record\.id\)\)/);
});

test('catálogo permite adicionar várias instâncias procedurais sem remover as anteriores', () => {
  assert.match(html, /Adicionar uma cópia deste personagem à cena/);
  assert.match(html, /row\.append\(selectButton, addButton, deleteButton\)/);
  assert.match(html, /function addCharacterInstance\(recordId, transform = null, options = {}\)/);
  assert.match(html, /generateCharacterPrototype\(\{ addToScene: true \}\)/);
  assert.match(html, /if \(!addToScene && character\)/);
  assert.match(html, /group\.userData\.characterRecordId = record\.id/);
});

test('exportação registra cada personagem e sua transformação individual', () => {
  assert.match(html, /sceneCharacters: objects\.filter\(obj => obj\.userData\.isCharacter\)/);
  assert.match(html, /active: obj === character/);
  assert.match(html, /source: obj\.userData\.proceduralCategory/);
});

test('importação valida instâncias e restaura personagens procedurais adicionais', () => {
  assert.match(html, /data\.sceneCharacters\.length > 500/);
  assert.match(html, /instance\.source !== 'procedural_preview'/);
  assert.match(html, /addCharacterInstance\(instance\.recordId, instance\.transform, \{(?=[^}]*offset: false)(?=[^}]*persist: false)[^}]*\}\)/);
});

test('selecionar personagem da cena atualiza seu cadastro associado', () => {
  assert.match(html, /characterRecordId = obj\.userData\.characterRecordId/);
  assert.match(html, /selectedRecord = window\.Estudio3DCharacters\.getCharacter\(characterRecordId\)/);
});


test('restauração local recria personagens procedurais adicionais sem perder o personagem ativo', () => {
  assert.match(html, /function restoreAdditionalSceneCharacters\(editorState\)/);
  assert.match(html, /editorState\.sceneCharacters\.forEach\(instance =>/);
  assert.match(html, /addCharacterInstance\(instance\.recordId, instance\.transform, \{(?=[^}]*offset: false)(?=[^}]*persist: false)[^}]*\}\)/);
  assert.match(html, /character = activeRoot/);
});

test('importação de cena preserva a instância marcada como ativa após recriar as demais', () => {
  assert.match(html, /const importedActiveRoot = character/);
  assert.match(html, /character = importedActiveRoot/);
  assert.match(html, /addCharacterInstance\(instance\.recordId, instance\.transform, \{(?=[^}]*offset: false)(?=[^}]*persist: false)[^}]*\}\)/);
});

test('modelos GLB importados ficam vinculados ao ID do cadastro no catálogo', () => {
  assert.match(html, /importedCharacter\.userData\.characterRecordId = record\.id/);
  assert.match(html, /root\.userData\.characterRecordId = activeId/);
});


test('instâncias múltiplas ainda não substituem modelos GLB externos por protótipos', () => {
  assert.match(html, /const canAddProcedural = !record\.model/);
  assert.match(html, /addButton\.disabled = !canAddProcedural/);
  assert.match(html, /Instâncias de modelos 3D externos serão habilitadas em uma próxima etapa/);
  assert.match(html, /A inclusão de múltiplas instâncias de modelos GLB externos será habilitada em uma próxima etapa/);
});
