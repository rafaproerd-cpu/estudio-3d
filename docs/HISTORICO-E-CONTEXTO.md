# Histórico, conversas, decisões e planejamento — Estúdio 3D

Última atualização: 25/11/2026

Este documento é o registro central de continuidade do Estúdio 3D. Reúne a visão do produto, decisões aprovadas, planejamento, estado técnico, histórico recente e próximos passos conhecidos.

**Nota importante:** este documento é um histórico consolidado, não uma transcrição literal de todas as mensagens do ChatGPT. As conversas originais permanecem no histórico da conta ChatGPT; elas não são copiadas automaticamente para o GitHub. Quando novas decisões e etapas forem tomadas, este arquivo deve ser atualizado para preservar o contexto do projeto.

## 1. Combinado de trabalho, conversa e salvamento

- O projeto significa tudo: código, arquivos, ideias, requisitos, decisões, planejamento, conversas relevantes, testes, problemas encontrados e próximos passos.
- Registrar no GitHub as alterações de código e atualizar este histórico com decisões e avanços importantes.
- Não dizer que algo foi salvo sem confirmar o commit.
- Preservar decisões anteriores; quando uma decisão mudar, registrar a mudança e o motivo, sem apagar silenciosamente o histórico.
- O usuário delegou as decisões técnicas rotineiras ao assistente. Evitar perguntas técnicas desnecessárias.
- Chamar o usuário principalmente quando houver um teste/validação real a fazer ou uma decisão de produto que dependa dele.
- Não alegar trabalho em segundo plano. Só comunicar progresso que tenha sido efetivamente realizado e verificado.
- Ao retomar o trabalho, consultar este documento e o estado atual do repositório antes de continuar.

## 2. Visão e escopo do produto

O Estúdio 3D deve ser uma plataforma ampla para criação e personalização de personagens, cenas, histórias e animações.

### Catálogo de personagens
- Humanos masculinos e femininos em todas as fases da vida: bebês, crianças, adolescentes, adultos e idosos.
- Animais domésticos e selvagens, aves e outras espécies.
- Personagens antropomórficos.
- Criaturas, monstros, dragões e seres de fantasia.
- Robôs e extraterrestres.
- Objetos antropomórficos.
- Heróis, vilões e outros tipos de personagens.

### Direção artística
O estilo não deve ser fixo por espécie ou projeto. Deve se adaptar à história e à direção artística: cartoon, cartoon realista, 3D estilizado, semi-realista, realista, fantasia, anime e outras abordagens. Estilos diferentes podem coexistir quando a narrativa pedir, mantendo coerência visual dentro de cada cena ou produção.

### Público e exportação
- Atender também criadores de jogos.
- Permitir exportar o personagem completo ou partes separadas, como cabeça, corpo, roupas, cabelo e acessórios.
- Prever fluxos e configurações para Unity, Unreal Engine e Godot.
- Suportar rigging e animações quando tecnicamente implementados e validados.

## 3. Planos, créditos e limites

Valores definidos como proposta de planejamento, ainda sujeitos à validação dos custos reais de processamento:

| Plano | Créditos mensais |
|---|---:|
| Estúdio Básico | 1.000 |
| Estúdio Pro | 10.000 |
| Estúdio Ultra | 100.000 |

- Créditos não utilizados acumulam para o mês seguinte, conforme decisão registrada no planejamento.
- Priorizar ferramentas gratuitas e processamento local no início, para controlar custos.
- O plano gratuito teve uma proposta anterior de até 3 minutos por vídeo; confirmar a estrutura final de planos antes de lançamento comercial.
- Os valores e regras comerciais precisam ser validados com custos reais, infraestrutura e testes de uso.

## 4. Áudio e exportação

Proposta aprovada para os três planos:
- Formatos: MP3, WAV, FLAC e OGG.
- Exportar narração, diálogos por personagem, músicas, efeitos sonoros, faixas separadas e mixagem completa.
- MP3 como referência de 192 kbps no Básico e até 320 kbps no Pro/Ultra.
- Recursos efetivos e limites por plano devem ser confirmados na implementação e validados com custos e desempenho.

## 5. Estado técnico conhecido

Repositório: https://github.com/rafaproerd-cpu/estudio-3d

Arquivos e módulos conhecidos:
- `interface-v2.html`: interface do editor 3D baseada em Three.js.
- `character-system.js`: catálogo e estrutura de dados de personagens.
- `estudio-core.js`: núcleo do projeto, persistência local, importação/exportação JSON e eventos.
- `tests/interface-v2.test.cjs`: testes automatizados da interface.

### Sistema de personagens
Versão conhecida: 1.1.0.
- Categorias: humano, animal, criatura, robô, alienígena, objeto e outros.
- Faixas etárias: bebê, criança, adolescente, adulto, idoso e não aplicável.
- Tipos de rig: humanoide, quadrúpede, ave, personalizado, nenhum e desconhecido.
- API conhecida: criação de personagem/aparência/direção visual, validação, inclusão no projeto, consulta, atualização, remoção e agrupamento visual.
- Estrutura de aparência inclui corpo, rosto, cabelo, vestuário, cores e características.

### Núcleo do projeto
Versão conhecida: 1.0.1.
- Projeto em memória e localStorage.
- Obter, atualizar, salvar e carregar projeto.
- Importar/exportar JSON.
- Sistema de eventos e adaptadores.

### Interface 3D
- Three.js 0.160.0 via CDN e GLTFLoader.
- Há tentativa de carregar `man-base-character-rigged.glb`.
- Ferramentas de formas primitivas, cor, escala, posição, rotação, iluminação, fundo e animação quando o modelo compatível está carregado.
- Exportação GLB implementada via GLTFExporter para o objeto selecionado, em modo binário.
- Protótipos procedurais básicos para categorias de personagens, incluindo ramo de aves.
- Escala aproximada por faixa etária.
- Registro do personagem e restauração de protótipo/transformação em importação JSON.
- Controles de cor principal e cor de detalhes, com persistência das cores no registro e restauração na reconstrução.
- Prevenção de duplicação de protótipos ao substituir personagem.

## 6. Histórico recente de desenvolvimento

Commits conhecidos na branch `main`:
- `f1c343ff993ba7dbf649d601ea85bfd5d217b23b`: exportação JSON v3 com metadados do personagem e transformação.
- `c6ad6dd752f01bc2fe8d1906ebc070a48182f92e`: importação/restauração de metadados, transformação, iluminação e fundo; compatibilidade JSON v2/v3.
- `6fb0a374f710dc91ea172f491ab036384271072f`: formulário universal de cadastro de personagens.
- `d6b0ad91f8eb1b6369f6329e2eb1ac3242e91719`: protótipo inicial de geração procedural 3D.
- `9e490399c13b782272bb792195810abdda253423`: evita pré-visualizações duplicadas e restaura cores salvas do protótipo.
- `b2842248eeb83ebbc47d33ece63c2a6203d343a1`: estabilização de teste de restauração de cor; 20 testes aprovados naquele ciclo.
- `5035e9a2ed71c50f1db50cc8b8b96373fb75a4a4`: controle separado de cor de detalhes.
- `063ff6c46d8e0c226a3af9a05d50324286f7d365`: estabiliza teste de restauração da cor de detalhes.

### Último estado confirmado em 25/11/2026
- Último commit conhecido na branch `main`: `063ff6c46d8e0c226a3af9a05d50324286f7d365`.
- Arquivo `interface-v2.html` foi consultado no GitHub; blob SHA naquele momento: `88d2956ed942bdd60c391c433623e93433177025`.
- Workflow automatizado de testes: 22 aprovados, 0 falhas.
- GitHub Pages: execução de publicação correspondente ao commit acima concluída com sucesso.
- Execução dos testes: https://github.com/rafaproerd-cpu/estudio-3d/actions/runs/45542964260
- Execução da publicação: https://github.com/rafaproerd-cpu/estudio-3d/actions/runs/45542964631

## 7. Limitações e validações pendentes

- Os personagens procedurais ainda são protótipos simples feitos com formas primitivas; não são modelos finais detalhados.
- A exportação GLB exporta o objeto selecionado e conteúdo visível; a exportação de protótipos procedurais é essencialmente geometria e materiais estáticos.
- Rigging e animações não estão garantidos na exportação dos protótipos procedurais.
- O JSON guarda o registro do personagem e transformações, não a malha 3D completa; a prévia é reconstruída a partir do registro.
- O tratamento de múltiplos personagens na mesma cena ainda precisa ser verificado e pode estar limitado pelo uso de variáveis globais.
- A dependência do modelo GLB externo precisa ser validada no navegador.
- Os testes automatizados passaram, mas isso não substitui teste visual e funcional real no navegador.
- A exportação GLB, o carregamento do Three.js e a interação completa da interface ainda precisam de validação manual em navegador.

## 8. Próximos passos técnicos sugeridos

1. Revisar o controle de cor principal para garantir que não sobrescreva a cor de detalhes.
2. Fazer teste manual da interface no navegador assim que a etapa estiver pronta para validação do usuário.
3. Evoluir personalização de partes do corpo, roupas, cabelo e acessórios, respeitando as partes realmente existentes em cada protótipo.
4. Planejar exportação de partes individuais do personagem.
5. Evoluir protótipos procedurais para modelos de maior qualidade e categorias mais completas.
6. Melhorar gerenciamento de múltiplos personagens e persistência da cena.
7. Validar exportação GLB e compatibilidade com ferramentas externas.
8. Atualizar este documento a cada marco relevante e manter testes automatizados.

## 9. Registro das conversas recentes sobre continuidade

- O usuário pediu que o desenvolvimento continue sem ser chamado a cada decisão técnica; quer ser chamado apenas para testes ou decisões que realmente dependam dele.
- O usuário reforçou que o combinado inclui salvamento, não apenas continuidade do desenvolvimento.
- Foi esclarecido que salvar o projeto significa preservar também o contexto, planejamento e decisões das conversas, além do código.
- Este documento foi criado para iniciar esse registro centralizado no próprio repositório.
- A partir daqui, acrescentar entradas datadas com decisões, perguntas importantes, respostas acordadas, mudanças de escopo, testes e próximos passos.

## 10. Modelo para novas entradas de conversa

### AAAA-MM-DD — Assunto
- **O que foi discutido:**
- **Decisão/combinação:**
- **Alterações feitas:**
- **Validação/testes:**
- **Pendências e próximo passo:**


## 11. 25/11/2026 — Retomada: independência das cores do personagem

- **Contexto:** ao retomar o projeto, foi revisado o controle de cor principal da interface.
- **Problema identificado:** o seletor de cor principal percorria todos os materiais do personagem, inclusive o material reservado aos detalhes (character-accent), podendo apagar visualmente a cor independente dos detalhes.
- **Correção implementada:** o controle principal agora ignora materiais com nome character-accent; o seletor de detalhes continua alterando apenas esse material.
- **Arquivos alterados:** interface-v2.html e tests/interface-v2.test.cjs.
- **Commits:** 36f7bd9 (cor principal preserva detalhes) e 9c0572f (teste de regressão).
- **Validação:** workflow automatizado Testes do sistema de personagens concluído com sucesso no commit 9c0572f. A etapa de testes automatizados passou. Isso não substitui a validação visual manual no navegador.
- **Próximo passo:** teste visual pelo usuário para confirmar a edição da cor principal e da cor de detalhes no protótipo; depois evoluir personalização por partes.


## 12. 25/11/2026 — Persistência ao excluir cadastro do catálogo

- **Problema identificado:** excluir um personagem do catálogo atualizava o projeto em memória, mas não chamava o salvamento local; ao recarregar o editor, o cadastro poderia reaparecer.
- **Correção:** após remover o cadastro, a interface chama Estudio3DCore.saveProject() e informa se a gravação local foi concluída. O modelo 3D que já está na cena permanece, conforme a mensagem da interface.
- **Arquivos:** interface-v2.html e tests/interface-v2.test.cjs.
- **Commits:** a515b1b (correção), 067b0e4 (teste inicial) e 182d9e1 (assertiva corrigida).
- **Validação:** workflow de testes concluído com sucesso no commit 182d9e1. 24 testes passaram no total; o primeiro ciclo encontrou uma assertiva de teste incorreta, corrigida no commit seguinte. O deploy Pages do mesmo commit estava em andamento no momento deste registro.
- **Limitação:** o salvamento é no armazenamento local do navegador, não sincroniza automaticamente os dados do editor com o GitHub.


## 13. 25/11/2026 — Correção da unidade de rotação na restauração procedural

- **Problema identificado:** o editor salva `editorRotationY` em graus, mas a reconstrução procedural atribuía esse valor diretamente a `group.rotation.y`, que usa radianos no Three.js.
- **Correção:** a restauração agora converte o valor salvo com `THREE.MathUtils.degToRad(savedEditorRotationY)`.
- **Arquivos:** `interface-v2.html` e `tests/interface-v2.test.cjs`.
- **Commits:** `7070209` (correção) e `7077ca6` (teste da conversão).
- **Validação:** workflow automatizado do commit `7077ca6` concluído com sucesso. A publicação do GitHub Pages referente aos commits de documentação subsequentes estava pendente na última consulta.
- **Estado anterior confirmado nesta retomada:** no commit `d1316994`, os 25 testes automatizados e a publicação do GitHub Pages concluíram com sucesso.
- **Próximo passo:** aguardar o workflow do commit `7077ca6`; depois continuar a revisão da restauração e seleção de personagens.


## 25/11/2026 — Isolamento entre seleção do catálogo e personagem ativo na cena

- Identificado risco de associação incorreta: selecionar outro cadastro no catálogo também alterava `characterRecordId`, que é usado pelos controles de aparência e persistência do modelo atualmente presente na cena.
- Separadas as referências `selectedCatalogRecordId` (cadastro em edição/selecionado no catálogo) e `characterRecordId` (cadastro associado ao personagem visual ativo na cena).
- Salvar dados e gerar protótipo agora usam o cadastro selecionado; ajustes de aparência, transformações e exportação JSON continuam vinculados ao personagem efetivamente presente na cena. A associação visual só muda ao gerar o protótipo ou carregar/restaurar um modelo.
- Exclusão limpa as referências correspondentes sem apagar automaticamente a malha visual da cena.
- Adicionados testes de regressão para impedir que a seleção no catálogo troque silenciosamente a associação do personagem ativo.
- Testes automatizados do GitHub Actions aprovados no commit `884f86233a40c3a6aaaea6630dd9f411ebfc644d` (workflow run `45630311820`).
- Publicação do GitHub Pages para esse commit foi iniciada; verificar conclusão antes de considerar a publicação atualizada.


## 25/11/2026 — Limpeza de animações ao substituir modelo rigged por protótipo

- Identificado que gerar um protótipo procedural após carregar um modelo rigged poderia deixar o mixer e os controles de animação apontando para o modelo antigo, já removido da cena.
- A geração procedural agora encerra as ações anteriores, limpa mixer/ação/clipes e desativa os controles de animação, indicando que o protótipo ainda não possui animações.
- Teste de regressão adicionado. GitHub Actions aprovado no commit `ba3079a02ad8cb0a5120e6dd1fb0670f0be4fe18` (workflow run `45630515181`).


## 25/11/2026 — Exportação e importação do catálogo completo de personagens

- Corrigida perda potencial de cadastros ao exportar projetos JSON: a versão 4 inclui a lista completa `characters`, além do personagem visual ativo e sua transformação.
- A importação aceita versões 2, 3 e 4, restaura o catálogo completo, normaliza e valida cada cadastro, rejeita entradas inválidas e IDs duplicados e preserva os identificadores originais.
- Compatibilidade com arquivos antigos sem ID: o identificador gerado durante a normalização também é aplicado ao registro ativo para evitar duplicação.
- Corrigido o caminho de importação antes do carregamento do GLB: o carregador verifica o ID importado e atualiza o cadastro existente em vez de criar uma cópia.
- Testes automatizados aprovados: 32/32 no GitHub Actions, workflow run `45633183501`, commit `65c69f8bbafe22af77afe13ab89088287528413a`.
- Limitação conhecida para a próxima etapa: a persistência local do núcleo guarda o catálogo, mas a restauração automática completa da cena ativa (modelo, objetos, cenário e transformações) após recarregar o navegador ainda precisa ser integrada e testada.


## 25/11/2026 — Persistência local da cena do editor

- O estado de trabalho do editor agora é gravado em `Estudio3DCore.settings.editorState`, mantendo as configurações existentes do projeto.
- São persistidos: ID do personagem ativo, posição/rotação/escala do personagem, objetos primitivos da cena e suas cores/transformações, cor de fundo e intensidade da luz.
- Ao reabrir o editor, a restauração valida os dados antes de reconstruir objetos suportados, reaplica cenário e iluminação e recupera o personagem ativo pelo ID do catálogo.
- Quando o personagem salvo é um protótipo procedural, o editor reconstrói o protótipo em vez de associar incorretamente o GLB-base; transformações são reaplicadas.
- Salvamento é local ao navegador/dispositivo via localStorage. Não é sincronização em nuvem e limpar os dados do navegador pode apagar esse estado. Exportar JSON continua sendo o meio portátil de backup.
- Testes automatizados aprovados: 35/35 no GitHub Actions, workflow run `45633679675`, commit `39da595866e442bf8829a6f89d76f0617d549fcf`.
- Próxima revisão: validar casos de cena vazia, falha/ausência do GLB-base e restauração de projetos com modelos externos; a aplicação ainda não guarda os bytes dos GLBs importados dentro do localStorage.


## 25/11/2026 — Preservação de cenas intencionalmente vazias

- O estado persistido agora registra `hasCharacter`, distinguindo uma cena que foi deixada sem personagem de um projeto ainda não inicializado.
- Ao reabrir, se `hasCharacter` for explicitamente `false`, o editor restaura os objetos/configurações salvos sem carregar automaticamente o GLB-base.
- Compatibilidade: estados antigos sem esse campo continuam seguindo o fluxo anterior de carregamento.
- Testes automatizados aprovados: 36/36 no GitHub Actions, workflow run `45633895779`, commit `9a19533a95b453a0571a2283a180dadcbab0e841`.


## 25/11/2026 — Ajustes finais na restauração e substituição de cenas

- Corrigida restauração da transformação completa (posição, rotação e escala) também para personagens rigged salvos localmente, não apenas para protótipos procedurais.
- Ao importar um projeto sem personagem ativo, o editor agora remove o personagem anterior da cena, limpa sua associação e encerra ações de animação antigas; o catálogo importado continua preservado separadamente.
- Testes automatizados aprovados: 38/38 no GitHub Actions, workflow run `45634201857`, commit `53fc035efa203f9518c1393cb69715f10a443410`.


## 25/11/2026 — Robustez adicional na restauração de personagens e cenas

- Personagens rigged agora recuperam posição, rotação e escala locais ao reabrir o editor.
- Importar um projeto sem personagem ativo remove o personagem visual anterior e limpa sua associação/animações, sem confundir isso com os demais cadastros do catálogo.
- Protótipos procedurais salvos são reconstruídos diretamente a partir do cadastro e do estado local, sem exigir o GLB-base; objetos e cenário também são restaurados nesse caminho.
- Testes automatizados aprovados: 39/39 no GitHub Actions, workflow run `45634504138`, commit `3e784fa8c9e5d949edfb54b65fef81089eac86d8`.


## 25/11/2026 — Validação prévia e segura na importação de projetos

- A importação agora valida previamente as transformações dos objetos (posição, rotação e escala), as cores e todos os cadastros do catálogo antes de remover ou substituir elementos da cena atual.
- Catálogos com dados inválidos ou IDs duplicados são rejeitados antes da alteração do projeto aberto, reduzindo o risco de deixar a cena parcialmente substituída por um arquivo defeituoso.
- A normalização dos personagens ocorre uma única vez durante a validação; somente depois o catálogo validado é aplicado ao projeto.
- Foram adicionados testes de regressão para confirmar que a validação acontece antes das alterações da cena e que o catálogo validado é aplicado sem nova normalização.
- GitHub Actions: workflow de testes 45635004153, commit b0c820cddb627e7a974e00b4fd55b112ae376c75, conclusão success.
- Limite mantido: o JSON guarda cadastro, transformações e configurações, mas não incorpora os bytes de modelos GLB externos; esses arquivos precisam continuar disponíveis separadamente.

## 25/11/2026 — Importação de modelos GLB externos e manifesto de assets

- A interface agora oferece a ação **Importar personagem GLB**, permitindo selecionar um arquivo `.glb` do dispositivo e carregá-lo diretamente na cena com o GLTFLoader.
- O modelo importado substitui o personagem visual anterior, é associado ao cadastro selecionado (ou cria um cadastro quando nenhum está selecionado) e registra nome do arquivo, formato e origem externa.
- Se o GLB contiver animações, os clipes são disponibilizados nos controles existentes; modelos sem animações mantêm esses controles desativados.
- A exportação JSON agora inclui `assetManifest`, com ID do personagem, identificador/nome do arquivo, formato e indicação explícita de que o binário não está incorporado.
- Limitação intencional desta etapa: o GLB continua sendo um arquivo separado. Ao transferir o projeto, mantenha o `.glb` junto do JSON; a importação JSON ainda não procura nem religa automaticamente esses arquivos. Empacotamento ZIP com assets incorporados fica para uma etapa posterior.
- Foram acrescentados testes automatizados para a interface de importação GLB e para o manifesto. Resultado do GitHub Actions será registrado após a conclusão do workflow.

- Validação final desta etapa: GitHub Actions run `45636001811`, commit `a3961a1ee23bd2df32d6470d24d3f469ae0f89f7`, **43/43 testes aprovados** (0 falhas). A checagem sintática do JavaScript da interface também passou. A importação/exportação GLB ainda requer teste visual manual em navegador com um arquivo real.

## 25/11/2026 — Pacote ZIP portátil do projeto

- Adicionado o comando **Exportar projeto completo (.zip)**. O pacote inclui `project.json` e os modelos GLB externos associados em `assets/<id-do-personagem>/<arquivo>.glb`.
- Ao importar um GLB na sessão, seus bytes são mantidos em memória para permitir que o pacote inclua o arquivo original, além dos metadados.
- O manifesto dentro do pacote aponta para `archivePath` e marca `embedded: true`. Os caminhos internos dos assets são sanitizados.
- O exportador impede criar um ZIP incompleto: se houver um modelo externo no catálogo cujo binário não foi importado nesta sessão, informa quais arquivos precisam ser carregados novamente.
- A compactação usa JSZip 3.10.1 via CDN. A criação do ZIP requer conexão para carregar essa biblioteca. O JSON simples continua disponível como antes.
- Escopo atual: exportação do pacote completo implementada; reimportação automática do ZIP com restauração dos GLBs ainda será a próxima etapa. Os arquivos não ficam guardados permanentemente no navegador pelo cache em memória.
- Testes automatizados adicionados para a inclusão do projeto e dos GLBs, além da proteção contra pacotes com arquivos ausentes. Aguardar resultado do workflow para registrar a validação.
