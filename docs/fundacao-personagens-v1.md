# Estúdio 3D — Fundação do sistema universal de personagens

**Documento:** arquitetura funcional v1.0  
**Objetivo:** definir uma base modular, extensível e independente de espécie, idade ou estilo artístico para todos os personagens do Estúdio 3D.

## 1. Princípios obrigatórios

1. O sistema não presume que todo personagem seja humanoide.
2. Categoria, faixa etária, anatomia, estilo visual e rig são dimensões separadas.
3. Cada parte editável deve ter identidade própria e poder ser substituída sem reconstruir o personagem inteiro.
4. O mesmo personagem pode ter diferentes direções artísticas, sem perder sua identidade e seus dados.
5. A edição manual e os dados básicos devem funcionar localmente, sem depender de serviços pagos.
6. Recursos de IA, geração avançada e processamento remoto são opcionais e sujeitos aos limites de custo do projeto.
7. Nenhuma função será anunciada como pronta antes de existir e passar por testes.

## 2. Catálogo universal

### Categorias
- Humanos: bebês, crianças, adolescentes, adultos e idosos.
- Animais: domésticos, selvagens, aves, aquáticos, répteis, insetos e outras espécies.
- Criaturas e monstros.
- Dragões e seres de fantasia.
- Robôs e máquinas.
- Extraterrestres.
- Objetos antropomórficos.
- Outras categorias extensíveis.

A categoria não determina automaticamente o estilo visual nem a anatomia.

## 3. Estrutura modular do personagem

Cada personagem possui um identificador estável e os seguintes grupos:

| Grupo | Dados editáveis |
|---|---|
| Identidade | nome, categoria, espécie, idade/estágio, descrição e etiquetas |
| Anatomia | tipo corporal, proporções, membros, articulações e características específicas |
| Cabeça/face | formato, olhos, pupilas, sobrancelhas, nariz/focinho, boca, orelhas e expressões |
| Cabelo/pelagem | tipo, forma, comprimento, cor, textura e variações |
| Corpo | altura, largura, volume, postura e proporções por região |
| Vestuário | peças, camadas, materiais, cores e tamanhos |
| Acessórios | itens independentes, posicionamento e regras de encaixe |
| Partes especiais | cauda, asas, chifres, penas, escamas, antenas e componentes específicos |
| Aparência | paleta, materiais, texturas, detalhes e direção artística |
| Animação | rig, esqueleto, controles, expressões e clipes, quando disponíveis |
| Exportação | formato, unidades, hierarquia, materiais, rig e compatibilidade de destino |

Partes opcionais não devem ser impostas a espécies ou modelos que não as utilizem.

## 4. Independência entre anatomia e estilo

O estilo será uma configuração por personagem ou por versão visual, não uma regra fixa da categoria. Estilos previstos: cartoon, cartoon realista, 3D estilizado, semirrealista, realista, fantasia e estilos futuros.

Personagens diferentes podem usar estilos diferentes. A coerência visual será configurada por cena, grupo ou produção quando necessário.

## 5. Contrato de dados sugerido

O objeto atual de personagem já possui `appearance.body`, `appearance.face`, `appearance.hair`, `appearance.wardrobe`, `appearance.colors` e `parts`. A evolução deve preservar esses campos e acrescentar dados sem invalidar projetos antigos.

Exemplo conceitual de novos campos:

```js
{
  anatomy: {
    baseType: "humanoid",
    species: "",
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
  }
}
```

Os valores acima são um contrato de referência, não indicam que geração de malha, rigging ou animação já estejam implementados. Identificadores de assets devem apontar para arquivos reais; não criar caminhos fictícios.

## 6. Fluxo de criação

1. Escolher categoria e espécie, quando aplicável.
2. Definir idade ou estágio de desenvolvimento, quando aplicável.
3. Selecionar anatomia/base corporal apropriada.
4. Ajustar proporções e características.
5. Personalizar rosto, cabelo/pelagem e partes especiais.
6. Adicionar roupas e acessórios como componentes independentes.
7. Escolher direção artística, materiais e cores.
8. Visualizar, salvar e reabrir o projeto.
9. Preparar rig e animação conforme a estrutura suportar.
10. Exportar personagem completo ou componentes separados, quando os exportadores estiverem implementados.

## 7. Compatibilidade e migração

- Projetos já salvos devem continuar abrindo.
- Campos novos devem receber padrões seguros quando estiverem ausentes.
- Atualizações parciais não podem apagar propriedades de aparência não alteradas.
- A remoção de uma parte deve atualizar referências dependentes sem corromper o personagem.
- O editor deve distinguir “não definido”, “não aplicável” e “não suportado”.

## 8. Etapas de implementação

### Fase A — Dados e validação
- Consolidar o contrato de personagem.
- Criar padrões por categoria/anatomia.
- Validar dados e migração de cadastros antigos.
- Testar criar, editar, salvar, carregar e excluir.

### Fase B — Editor modular
- Controles reais para corpo, face, cabelo/pelagem, roupas e acessórios.
- Atualização do visualizador ao editar.
- Seleção e ocultação de componentes independentes.

### Fase C — Geometria e biblioteca
- Construir malhas-base próprias e reutilizáveis.
- Variar proporções e peças sem depender de um único boneco.
- Adicionar bibliotecas de componentes por categoria.

### Fase D — Rig e animação
- Esqueletos adequados a humanoides, quadrúpedes, aves e estruturas personalizadas.
- Testes de deformação, pesos e movimentos.
- Animação facial e sincronização labial quando tecnicamente suportadas.

### Fase E — Exportação
- Exportar personagem completo e partes separadas.
- Validar formatos e configurações para Blender, Unity, Unreal e Godot.
- Testar cada exportação em ferramentas de destino antes de declará-la compatível.

## 9. Critérios de aceite da fundação

- Um personagem humano e um não humano podem compartilhar o mesmo contrato sem campos obrigatórios inadequados.
- É possível alterar face, corpo, roupa ou acessório sem apagar os demais dados.
- Projetos antigos continuam carregando.
- A direção artística pode mudar sem mudar a categoria ou identidade.
- O sistema funciona para edição básica local sem chave de API ou serviço pago.
- O estado real de cada recurso é informado com transparência.

## 10. Estado atual conhecido

O repositório já contém cadastro de personagens, categorias básicas, faixa etária, estrutura/rig, direção visual, descrição, edição, exclusão e salvamento/carregamento local. O módulo de personagens já prevê campos estruturados de aparência e partes.

O visualizador cria uma prévia geométrica simples para alguns tipos. Isso ainda não equivale a um editor completo de malha 3D. Modelagem detalhada, biblioteca universal de componentes, rigging avançado, animações próprias e exportação completa continuam sendo trabalho futuro.

**Próxima entrega técnica recomendada:** implementar e testar a Fase A no módulo de personagens, mantendo compatibilidade com os projetos existentes, antes de ampliar a interface.
