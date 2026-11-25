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
