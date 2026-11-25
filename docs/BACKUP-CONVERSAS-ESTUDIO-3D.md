# Backup consolidado das conversas — Estúdio 3D

Data do backup: 25/11/2026

## Sobre este backup

Este arquivo reúne o contexto de conversas do projeto que está disponível para continuidade: decisões expressas pelo usuário, requisitos, combinações de trabalho e propostas discutidas. **Não é uma transcrição literal nem um download integral do histórico da conta ChatGPT.** Algumas conversas antigas estão disponíveis apenas como resumos; por isso, não inventamos falas ou detalhes que não estejam preservados. O histórico original do ChatGPT continua sendo a fonte para consultar as mensagens completas.

Use este documento junto com [HISTORICO-E-CONTEXTO.md](HISTORICO-E-CONTEXTO.md), que registra o estado técnico e o planejamento geral.

## 1. Preferências e combinações expressas pelo usuário

- O projeto deve avançar continuamente; o usuário prefere ser chamado principalmente quando houver teste ou validação a realizar, ou decisão importante que dependa dele.
- O assistente deve assumir decisões técnicas rotineiras, evitando interromper o usuário com perguntas desnecessárias.
- O combinado de encerramento inclui salvar o projeto, e não apenas dizer que continuará.
- “Projeto” significa tudo: código, funcionalidades, planejamento, ideias, decisões e contexto relevante das conversas.
- As conversas e decisões importantes devem ser registradas no repositório para facilitar a retomada.
- Prioridade declarada: custo de R$ 0,00 sempre que possível.
- O usuário aceitou importação/exportação 3D gratuita, sem consumir créditos em operações manuais, com formatos citados GLB e glTF.
- O usuário pediu explicitamente que a interface T12 fosse incluída na continuidade e que o trabalho não se limitasse a repetir verificações de arquivos.

## 2. Histórico recuperado de desenvolvimento e interface

### Estrutura anterior do repositório e versões de interface
Em conversa de 24/11/2026, foi registrado que o repositório tinha três arquivos centrais mencionados: uma interface T2 já feita, `teste-estudio.html` e `index.html`. O usuário estava com o Estúdio 3D aberto e pediu continuidade incluindo a interface T12. Também foi mencionado que o projeto já tinha GitHub Pages configurado na branch `main`, e que testes no Safari haviam sido feitos. Naquela etapa houve dificuldades para exibir um humano completo.

### Versão V7 e personagens
Em conversa posterior, foi relatado trabalho na V7 para corrigir:
- sincronização entre edição e exclusão de personagens;
- remoção de prévias 3D antigas;
- liberação de recursos para evitar acúmulo;
- personagem chamada Raquel já aparecia na interface;
- modelo visual ainda estava básico e precisava evoluir.

Esses pontos são registros históricos recuperados; antes de alterar arquivos legados, conferir o estado atual do repositório e identificar quais versões ainda fazem parte do fluxo ativo.

## 3. Visão de produto e propostas discutidas

Foi discutida uma plataforma de criação com escopo amplo, incluindo:
- personagens universais e modulares;
- modos ou áreas de trabalho para Personagens, Vídeos e Histórias;
- áudio, animação, cenários e recursos de IA;
- renderização e exportação;
- possível marketplace;
- planos Free, Pro e Ultra.

**Status:** estes itens são propostas e linhas de produto discutidas. Não tratar todos como funcionalidades já implementadas ou decisões comerciais finais. As decisões confirmadas sobre catálogo, estilos, exportação, áudio e créditos estão detalhadas no histórico principal.

## 4. Fundação do sistema universal de personagens

Foi registrado que a Fundação do Sistema Universal de Personagens v1.0 havia sido criada e que a Fase A — estrutura de dados e validação — estava planejada. O desenvolvimento evoluiu posteriormente para o módulo `character-system.js`, cuja versão conhecida e estado atual estão documentados no histórico principal.

Objetivo de longo prazo: permitir personagens de diferentes espécies, categorias, idades e direções artísticas com uma estrutura comum, sem restringir a criação a um único tipo de humano ou estilo.

## 5. Custos e operações manuais

- Preferência por soluções gratuitas e processamento local sempre que viável.
- Importar e exportar arquivos 3D em GLB/glTF deve ser gratuito e não consumir créditos quando for uma operação manual local.
- Créditos devem ser reservados para recursos que realmente consumam processamento/serviços computacionais, conforme regras que ainda precisam ser definidas e validadas.
- Não transformar uma preferência de custo em promessa de que toda infraestrutura futura será gratuita; avaliar custos reais antes de lançamento.

## 6. Conversas de 25/11/2026 sobre salvamento e memória do projeto

O usuário esclareceu que o combinado de salvamento não era apenas continuar o desenvolvimento: queria preservar também as conversas, o planejamento e tudo o que compõe o projeto.

Foi criado o arquivo `docs/HISTORICO-E-CONTEXTO.md` para registrar decisões, requisitos, planejamento, estado técnico, testes e próximos passos. Em seguida, o usuário pediu backup das conversas também. Este arquivo é a primeira versão desse backup consolidado, com o contexto recuperável no momento.

O usuário perguntou se salvar diretamente no GitHub causaria problemas. Foi explicado que o GitHub é adequado para código e documentação do projeto, desde que não sejam armazenados segredos como senhas, tokens ou dados pessoais sensíveis.

## 7. Regras para atualizar este backup

Sempre que uma conversa trouxer algo relevante para o projeto:
1. Registrar a data e o assunto.
2. Separar claramente o que o usuário decidiu do que foi apenas sugerido.
3. Preservar requisitos, números, nomes de versões, formatos e restrições.
4. Anotar alterações realizadas, commits e resultados de testes quando confirmados.
5. Registrar perguntas em aberto e próximos passos.
6. Não substituir transcrições por resumos sem deixar claro que são resumos.
7. Não incluir credenciais, tokens, senhas ou dados pessoais sensíveis.

## 8. Modelo para novas entradas

### AAAA-MM-DD — Tema da conversa
- **Contexto recuperado:**
- **Pedido do usuário:**
- **Decisão confirmada:**
- **Propostas ainda não aprovadas:**
- **Trabalho realizado e commit:**
- **Testes/validação:**
- **Próxima etapa:**


## 9. 25/11/2026 — Retomada do desenvolvimento

O usuário pediu para continuar a partir do backup e do ponto em que o projeto havia parado. O histórico e o backup foram consultados no GitHub antes de alterar o código.

- **Tarefa retomada:** revisão da independência entre cor principal e cor de detalhes.
- **Achado:** o seletor principal alterava todos os materiais, incluindo o material reservado aos detalhes.
- **Alteração realizada:** o seletor principal passou a ignorar o material character-accent; foi adicionado teste automatizado de regressão.
- **Commits:** 36f7bd9 e 9c0572f.
- **Testes:** workflow automatizado concluído com sucesso no commit 9c0572f.
- **Ainda pendente:** teste visual/funcional manual no navegador. Não registrar essa validação como concluída até o usuário testar.


## 10. 25/11/2026 — Exclusão segura do cadastro

Foi identificado que a exclusão de um personagem no catálogo não persistia a remoção no armazenamento local. A interface agora chama saveProject após remover o cadastro e apresenta o resultado do salvamento. O modelo 3D na cena continua preservado. Arquivos alterados: interface-v2.html e tests/interface-v2.test.cjs. Commits: a515b1b, 067b0e4 e 182d9e1. O workflow automatizado concluiu com sucesso no commit 182d9e1. O salvamento é local ao navegador; não é sincronização remota do conteúdo criado no editor.


## 11. 25/11/2026 — Ajuste na restauração da rotação do personagem

Durante a continuidade do editor, foi identificado que o ângulo salvo no cadastro procedural é armazenado em graus, enquanto o Three.js espera radianos na propriedade `rotation.y`. A reconstrução agora converte o valor usando `THREE.MathUtils.degToRad`. A mudança foi registrada em `interface-v2.html` (commit `7070209`) e recebeu teste de regressão em `tests/interface-v2.test.cjs` (commit `7077ca6`). O workflow automatizado do commit `7077ca6` foi confirmado com sucesso. A publicação do GitHub Pages dos commits de documentação subsequentes ainda estava pendente na última consulta.


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
- Validação do pacote ZIP: GitHub Actions run `45637936743`, commit `422d03851baa43d7436a782bb93fa86866138147`, **45/45 testes aprovados** (0 falhas). O workflow de publicação do Pages para o backup mais recente ainda estava em execução na última consulta.

## 25/11/2026 — Importação automática de pacote ZIP

- Adicionado botão **Importar projeto completo (.zip)** para abrir o pacote criado pelo exportador, restaurando o `project.json`, o catálogo e os arquivos GLB associados.
- A importação valida CRC do ZIP, quantidade de entradas, caminhos internos (bloqueia caminhos absolutos e segmentos `.`/`..`), versão do projeto, manifesto, associação dos IDs, assinatura/versão/tamanho do cabeçalho GLB e integridade dos modelos via GLTFLoader antes de aplicar o projeto.
- Limites atuais: ZIP até 150 MB, até 1.000 entradas, conteúdo descompactado declarado até 300 MB, GLB individual até 100 MB e soma dos GLBs até 250 MB.
- Todos os GLBs listados no manifesto são preparados antes da importação JSON. O personagem ativo é restaurado na cena com suas transformações e clipes de animação; os binários de todos os personagens do pacote ficam disponíveis em memória para novo empacotamento durante a sessão.
- Projetos com personagem procedural ativo também recriam o protótipo e reaplicam as transformações. Formatos JSON antigos v2/v3 continuam no importador JSON; o pacote ZIP atual exige projeto v4 com manifesto.
- Testes automatizados no GitHub Actions: run `45639169856`, commit `4f35a79a8c8f3bc4f675bae12835f2b079694073`, **49/49 aprovados, 0 falhas**. Publicação GitHub Pages para esse commit ainda estava em andamento na última consulta.
- Limitação pendente: validação visual e round-trip real no navegador com GLBs de exemplo, inclusive com animações. O teste automatizado cobre validações e integração estrutural, mas não substitui o teste manual do fluxo de ponta a ponta.
- Correção adicional: importações agora invalidam carregamentos assíncronos do GLB-base que já estavam em andamento, evitando que o carregamento inicial sobrescreva o projeto recém-importado. Teste de regressão incluído.
- Validação final do código: GitHub Actions run `45639470486`, commit `8b45872f1d324813371fa1fabe66a48f8b73b07c`, **50/50 testes aprovados, 0 falhas**. A publicação Pages para o commit ainda estava em andamento na última consulta.
- Endurecimento adicional do manifesto: cada `archivePath` agora precisa pertencer à pasta do ID do personagem correspondente; caminhos duplicados são recusados e o importador exige que todos os cadastros com modelo `external_file` estejam representados no manifesto.
- Testes atualizados: GitHub Actions run `45639682485`, commit `044f387ceab69270c977cc945588712ed2992d7b`, **51/51 aprovados, 0 falhas**. A publicação Pages para esse commit estava em andamento na última consulta.


## 25/11/2026 — Primeira etapa de múltiplos personagens na cena

- O catálogo agora apresenta uma ação para adicionar uma instância do personagem à cena, mantendo as instâncias anteriores.
- A primeira etapa atende **protótipos procedurais**. Cada raiz recebe o ID do cadastro associado; ao selecionar uma instância, o editor atualiza o cadastro ativo para que os ajustes de aparência e transformações atinjam o personagem correto.
- Cada instância mantém posição, rotação e escala próprias. A exportação JSON e o estado local do editor registram a lista `sceneCharacters`, incluindo a instância ativa e a origem do modelo.
- A importação JSON valida a lista (máximo de 500 instâncias e vetores de transformação com três números finitos) antes de alterar a cena; restaura instâncias procedurais adicionais e preserva a instância marcada como ativa.
- A restauração local também recria as instâncias procedurais adicionais. O espaçamento inicial evita sobreposição entre cópias criadas pelo catálogo.
- Segurança de escopo: o botão de adicionar fica desativado para modelos GLB externos ou outros modelos não procedurais, para não substituir indevidamente o vínculo original do arquivo. Múltiplas instâncias de GLB, mixers/animações independentes e exportação de toda a cena em GLB ficam para etapas seguintes.
- Validação automatizada: GitHub Actions run `45641787409`, commit `8120f7000b5d15f444867f2414799beefae26c3b`, **59/59 testes aprovados, 0 falhas**.
- A publicação do GitHub Pages associada ao commit mais recente ainda estava em execução na última consulta. Os testes são automatizados e não substituem validação visual real no navegador.

- Atualização de publicação: GitHub Pages run `45641787596` concluiu com sucesso nos jobs de build e deploy para o código desta etapa. As alterações de documentação posteriores também possuem workflows próprios em andamento.

## 25/11/2026 — Correção da exclusão de instâncias e regressões

- Ao excluir um personagem da cena, o editor agora remove somente a instância selecionada. Se ela era a ativa, escolhe outra instância de personagem que permaneça na cena e atualiza o vínculo do cadastro; se era outra instância, preserva o personagem ativo.
- Os controles de animação são desativados quando a instância ativa é removida, evitando manter ações/mixer ligados ao objeto excluído. A recuperação automática de animações de outra instância GLB ainda depende da futura arquitetura de mixers independentes.
- Quatro assertivas do bloco de múltiplas instâncias foram ajustadas para verificar o comportamento implementado e aceitar a ordem válida das opções `offset` e `persist`; a falha anterior era causada por testes excessivamente rígidos, não por falha do código de restauração.
- Testes automatizados: GitHub Actions run `45642777003`, commit `b2346b82e6d511d47de405962906ad69dc6dafb5`, **60/60 aprovados, 0 falhas**.
- A validação é automatizada e estática/estrutural; não substitui teste visual real no navegador com vários modelos e animações.

## 25/11/2026 — GLBs múltiplos, mixers independentes e exportação de cena

- A interface agora oferece `Importar GLB (substituir)` e `Adicionar GLB à cena`, permitindo manter vários modelos externos simultaneamente. Cada modelo adicionado recebe cadastro próprio e transformação independente.
- Cada raiz de personagem mantém seu próprio `THREE.AnimationMixer` e lista de clipes. Selecionar outro personagem alterna os controles para as animações dele; o loop atualiza os mixers registrados. Ao remover ou limpar personagens, os mixers correspondentes são encerrados e descartados.
- A importação de pacote ZIP também recria as instâncias GLB adicionais registradas em `sceneCharacters`, reaplicando transformações e clipes de cada asset disponível no pacote.
- Foi adicionado `Exportar cena completa GLB`, que exporta cópias dos objetos visíveis registrados pelo editor (personagens e primitivas), sem reparentar os objetos originais. O botão anterior continua exportando apenas o personagem selecionado.
- Limitação conhecida: a exportação da cena completa inclui geometria e materiais, mas ainda não serializa os clipes de animação independentes. Isso requer etapa própria de consolidação/validação de animações. A portabilidade ZIP preserva os arquivos GLB originais.
- Testes automatizados: run `45644158732`, commit `682a4b8df04ff537db45c7fe3ee6a1204bf70cf9`, **66/66 aprovados, 0 falhas**. Os testes cobrem estrutura e regressões; não substituem teste visual de navegador nem round-trip real com arquivos GLB animados.
- Publicação Pages referente à alteração de código está sendo verificada separadamente; não considerar publicada até o workflow concluir.

## 25/11/2026 — Gerenciamento de instâncias e preparação para o primeiro teste visual

- O painel `Objetos da cena` agora permite renomear a instância selecionada e duplicar objetos e personagens procedurais. Os nomes são individuais por instância e são gravados no estado local do editor.
- A duplicação de personagens GLB foi habilitada usando `SkeletonUtils.clone`, para separar corretamente os esqueletos. A cópia recebe transformação independente e um `AnimationMixer` próprio; o arquivo original continua compartilhado no manifesto/pacote ZIP por cadastro.
- A restauração de pacotes ZIP também usa clonagem segura de esqueleto por instância GLB, reaplica os nomes e transformações e registra animações independentes. A exportação da cena completa usa a mesma clonagem segura antes de montar o arquivo GLB.
- Selecionar um objeto comum desativa os controles de animação, evitando que os botões de animação atuem por engano no personagem anteriormente selecionado.
- Ajustada a persistência: ao criar/restaurar uma instância procedural adicional, o gerador não grava um estado intermediário antes da transformação final ser aplicada; a rotina chamadora persiste o estado completo.
- Testes automatizados: workflow `45645110588`, commit `7490e8fbf6701fa01b9589ce783ad73d9a9a26fc`, **72/72 aprovados, 0 falhas**. Cobrem estrutura e regressões, não substituem execução visual real no navegador.
- Ainda falta o primeiro teste visual/manual com GLBs reais, incluindo ao menos dois modelos animados, duplicação, seleção, exclusão, exportação/importação ZIP e exportação da cena completa. Também é necessário verificar os arquivos resultantes em um visualizador/engine 3D.

## 25/11/2026 — Controle de visibilidade da cena

- Adicionado controle `Ocultar/Mostrar` para a instância selecionada no painel de objetos. Itens ocultos continuam selecionáveis pela lista e são marcados visualmente.
- A visibilidade é persistida por instância para personagens e objetos comuns, restaurada no estado local e nas importações JSON/ZIP (incluindo instâncias procedurais e GLB), e respeitada pela exportação da cena completa, que inclui somente objetos visíveis.
- Corrigida também a restauração da visibilidade do personagem ativo, além das instâncias adicionais.
- Testes automatizados: workflow `45645750205`, commit `6370fcf1d1ec3e367d7336d9aeee6dd8fb97c100`, **76/76 aprovados, 0 falhas**.
- Limite de validação: ainda são testes estruturais/automatizados. O teste visual real no navegador e o round-trip com arquivos GLB reais continuam pendentes antes de declarar a etapa validada.
