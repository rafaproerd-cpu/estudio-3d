# Roteiro do primeiro teste visual — Estúdio 3D

Data de preparação: 25/11/2026

Este roteiro valida o editor no navegador. Os testes automatizados atuais verificam estrutura e regressões; eles não substituem estas verificações visuais nem um round-trip real de arquivos GLB/ZIP.

## Antes de começar

1. Abra a versão publicada do Estúdio 3D: https://rafaproerd-cpu.github.io/estudio-3d/
2. Use um navegador atualizado em computador, de preferência Chrome ou Edge, para ter espaço de tela e suporte WebGL.
3. Aguarde o visor terminar de carregar. Se o personagem-base não aparecer, anote a mensagem de status e não considere a etapa aprovada.
4. Para validar importação de GLB, separe um arquivo GLB válido. Para testar animação independente, prefira um GLB com pelo menos um clipe de animação. A mesma origem GLB pode ser adicionada mais de uma vez para testar instâncias independentes.

## Etapa A — cena e personagens procedurais

- [ ] Criar um personagem pelo cadastro universal e gerar o protótipo 3D.
- [ ] Adicionar uma segunda instância do mesmo cadastro.
- [ ] Selecionar cada instância e alterar posição, rotação e escala.
- [ ] Renomear as instâncias com nomes diferentes.
- [ ] Ocultar uma instância e depois usar a lista para selecioná-la e mostrá-la novamente.
- [ ] Duplicar um personagem procedural e confirmar que a cópia pode ser transformada separadamente.
- [ ] Excluir uma instância e confirmar que as demais permanecem na cena.

Resultado esperado: cada instância mantém nome, transformação e visibilidade independentes.

## Etapa B — modelos GLB

- [ ] Importar um arquivo usando “Importar GLB (substituir)”.
- [ ] Adicionar outro GLB usando “Adicionar GLB à cena”.
- [ ] Se o arquivo tiver animação, selecionar o personagem e iniciar um clipe.
- [ ] Selecionar o outro personagem e verificar se os controles mostram as animações dele, não as do primeiro.
- [ ] Duplicar um personagem GLB e conferir se o esqueleto da cópia não interfere no original.
- [ ] Mover, girar, redimensionar, ocultar e renomear cada instância.

Resultado esperado: instâncias independentes; animações por personagem sem misturar os mixers. Registre qualquer deformação de esqueleto, travamento ou troca incorreta de clipe.

## Etapa C — salvar, fechar e restaurar

- [ ] Exportar o projeto como ZIP.
- [ ] Recarregar a página.
- [ ] Importar o ZIP exportado.
- [ ] Conferir personagens, objetos, nomes, transformações, visibilidade e clipes disponíveis.
- [ ] Criar ou renomear objetos primitivos, ocultar um deles e confirmar nome e visibilidade após importar o ZIP.
- [ ] Deixar uma animação em execução, exportar o ZIP e confirmar que ela retoma no clipe e no tempo aproximado salvos.
- [ ] Repetir com a animação pausada e confirmar que ela continua pausada após a restauração.
- [ ] Confirmar se todos os GLBs externos foram restaurados a partir do pacote, sem depender de arquivos soltos no computador.

Resultado esperado: o estado salvo volta sem duplicar ou perder instâncias, mantendo nomes, visibilidade e estado das animações.

## Etapa D — exportação

- [ ] Exportar um personagem selecionado em GLB.
- [ ] Exportar a cena completa em GLB.
- [ ] Abrir os arquivos exportados em um visualizador GLB ou em Blender.
- [ ] Conferir geometria, materiais, escala, orientação e presença de todos os itens visíveis.
- [ ] Verificar separadamente as animações: a exportação da cena completa ainda precisa de validação específica de clipes e não deve ser considerada aprovada apenas porque o arquivo abre.

## Como registrar um problema

Para cada falha, anote:
- etapa e ação exata realizada;
- o que esperava acontecer;
- o que aconteceu de fato;
- mensagem de status ou erro;
- navegador e dispositivo;
- se possível, captura de tela ou arquivo GLB/ZIP de exemplo sem dados privados.

## Critério de aprovação

A primeira rodada é aprovada quando A, B, C e a parte estática de D funcionarem sem perda de dados, travamentos ou interferência entre instâncias. A exportação de animações da cena completa permanece uma validação separada até ser implementada e testada.
