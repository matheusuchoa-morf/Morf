import { Module } from "@/types";

export const modules: Module[] = [
  {
    id: "mod-prospeccao-101",
    title: "Prospecção Ativa 101",
    description:
      "Aprenda as bases da prospecção outbound: como encontrar leads qualificados e fazer o primeiro contato de forma eficaz.",
    icon: "🎯",
    category: "prospecção",
    difficulty: "iniciante",
    xpReward: 150,
    requiredLevel: 1,
    estimatedMinutes: 20,
    lessons: [
      {
        id: "les-prosp-1",
        title: "O que é Prospecção Ativa?",
        content: `## O que é Prospecção Ativa?

Prospecção ativa (outbound) é quando **você vai até o cliente**, ao invés de esperar que ele venha até você.

### Por que é importante?
- Você controla o volume do seu pipeline
- Não depende apenas de marketing/inbound
- Pode focar em contas estratégicas (ABM)

### Canais principais:
1. **Cold Call** — Ligação fria para o decisor
2. **Cold Email** — Sequência de e-mails personalizados
3. **Social Selling** — LinkedIn e redes sociais
4. **Referral** — Indicações de clientes atuais

### A regra de ouro:
> "Prospecção não é sobre vender. É sobre iniciar uma conversa relevante."

Seu objetivo no primeiro contato é **gerar curiosidade**, não fechar negócio.`,
        type: "teoria",
        xpReward: 30,
      },
      {
        id: "les-prosp-2",
        title: "Definindo seu ICP (Perfil de Cliente Ideal)",
        content: `## Definindo seu ICP

ICP = Ideal Customer Profile. É o perfil de empresa que mais se beneficia do seu produto/serviço.

### Como definir seu ICP:

**1. Analise seus melhores clientes:**
- Qual o tamanho dessas empresas?
- Qual o segmento?
- Qual o ticket médio?
- Quanto tempo levaram para fechar?

**2. Identifique padrões:**
- Cargo do decisor
- Dor principal que resolvemos
- Stack tecnológica que usam

**3. Monte sua matriz ICP:**

| Critério | Peso | Cliente A | Cliente B |
|----------|------|-----------|-----------|
| Segmento | 30% | ✅ | ❌ |
| Tamanho | 25% | ✅ | ✅ |
| Budget | 25% | ✅ | ❌ |
| Fit técnico | 20% | ✅ | ✅ |

### Exercício prático:
Liste 5 empresas que são seu ICP perfeito e justifique cada uma.`,
        type: "prática",
        xpReward: 40,
      },
      {
        id: "les-prosp-3",
        title: "Quiz: Prospecção Ativa",
        content: `Teste seus conhecimentos sobre prospecção ativa!`,
        type: "quiz",
        xpReward: 50,
      },
    ],
  },
  {
    id: "mod-cold-call",
    title: "Cold Call que Converte",
    description:
      "Domine a arte da ligação fria: scripts, tom de voz, como passar pela secretária e técnicas para gerar reuniões.",
    icon: "📞",
    category: "prospecção",
    difficulty: "intermediario",
    xpReward: 200,
    requiredLevel: 3,
    estimatedMinutes: 30,
    lessons: [
      {
        id: "les-cold-1",
        title: "Anatomia de uma Cold Call Perfeita",
        content: `## Anatomia de uma Cold Call Perfeita

### Os 4 blocos da ligação:

**1. Abertura (10 segundos)**
- Seu nome + empresa
- Motivo da ligação (pattern interrupt)
- Exemplo: "Oi [Nome], aqui é o João da Morf. Vi que vocês estão contratando 3 SDRs e imaginei que escalar o time comercial é prioridade. Faz sentido?"

**2. Qualificação rápida (30 segundos)**
- 1-2 perguntas para validar fit
- "Como vocês fazem [processo] hoje?"
- "Qual o maior desafio nessa área?"

**3. Pitch de valor (20 segundos)**
- Conecte a dor com sua solução
- Use social proof: "Ajudamos a [empresa similar] a [resultado]"

**4. CTA claro (10 segundos)**
- Peça a reunião com data e hora
- "Que tal uma conversa de 15 min na quinta às 14h?"

### Tom de voz:
- Confiante, mas não arrogante
- Curioso, não desesperado
- Ritmo médio, pausas estratégicas`,
        type: "teoria",
        xpReward: 40,
      },
      {
        id: "les-cold-2",
        title: "Script Builder: Monte seu Script",
        content: `## Exercício: Monte seu Script de Cold Call

Agora é sua vez! Preencha cada bloco:

### 1. Abertura
- Seu nome e empresa: ___
- Pattern interrupt (o gancho): ___
- Pergunta de permissão: ___

### 2. Qualificação
- Pergunta sobre processo atual: ___
- Pergunta sobre dor/desafio: ___

### 3. Pitch de valor
- Resultado que você entrega: ___
- Case de sucesso: ___

### 4. CTA
- Proposta de próximo passo: ___

### Dica extra: Lidando com objeções comuns
| Objeção | Resposta |
|---------|----------|
| "Não tenho tempo" | "Entendo, por isso é uma conversa de 15 min. Se não fizer sentido, prometido que não insisto." |
| "Manda por email" | "Claro! Para eu personalizar, me conta: como vocês fazem [X] hoje?" |
| "Já temos fornecedor" | "Ótimo! Não é sobre trocar, mas ver se existe algo que complemente." |`,
        type: "prática",
        xpReward: 50,
      },
    ],
  },
  {
    id: "mod-qualificacao",
    title: "Qualificação com BANT e MEDDIC",
    description:
      "Aprenda os frameworks de qualificação mais usados no mercado para nunca mais perder tempo com leads desqualificados.",
    icon: "🔍",
    category: "qualificação",
    difficulty: "intermediario",
    xpReward: 250,
    requiredLevel: 5,
    estimatedMinutes: 35,
    lessons: [
      {
        id: "les-qual-1",
        title: "BANT: Budget, Authority, Need, Timeline",
        content: `## Framework BANT

BANT é o framework clássico de qualificação:

### B - Budget (Orçamento)
- "Existe budget alocado para esse tipo de solução?"
- "Qual a faixa de investimento que faz sentido?"
- Red flag: 🚩 "Não temos budget" sem previsão

### A - Authority (Autoridade)
- "Quem mais participa dessa decisão?"
- "Como funciona o processo de compra aí?"
- Red flag: 🚩 Falar só com influenciador sem acesso ao decisor

### N - Need (Necessidade)
- "Qual o impacto desse problema no resultado?"
- "O que acontece se não resolverem isso?"
- Red flag: 🚩 "Nice to have" sem urgência

### T - Timeline (Prazo)
- "Quando vocês precisam ter isso rodando?"
- "Existe algum evento que acelera a decisão?"
- Red flag: 🚩 Sem prazo = sem urgência

### Pontuação BANT:
- 4/4 = Deal quente 🔥
- 3/4 = Vale investir tempo
- 2/4 = Nutrir
- 1/4 = Desqualificar`,
        type: "teoria",
        xpReward: 50,
      },
      {
        id: "les-qual-2",
        title: "MEDDIC para Vendas Complexas",
        content: `## Framework MEDDIC

Para vendas B2B complexas, MEDDIC é mais robusto:

### M - Metrics (Métricas)
Qual o impacto quantificável?
- "Quanto custa esse problema por mês?"
- "Qual o ROI esperado?"

### E - Economic Buyer (Comprador Econômico)
Quem assina o cheque?
- "Quem aprova investimentos dessa natureza?"

### D - Decision Criteria (Critérios de Decisão)
O que importa na escolha?
- "Quais critérios vocês vão usar para avaliar?"

### D - Decision Process (Processo de Decisão)
Como decidem?
- "Quais são as etapas até a assinatura?"

### I - Identify Pain (Identificar a Dor)
A dor é real e urgente?
- "O que acontece se não resolverem nos próximos 90 dias?"

### C - Champion
Tem alguém vendendo por dentro?
- Seu champion defende sua solução internamente

> **Dica:** Quanto mais complexa a venda, mais importante é mapear TODOS os stakeholders.`,
        type: "teoria",
        xpReward: 50,
      },
    ],
  },
  {
    id: "mod-negociacao",
    title: "Negociação Estratégica",
    description:
      "Técnicas avançadas de negociação: ancoragem, ZOPA, BATNA e como lidar com pedidos de desconto sem destruir sua margem.",
    icon: "⚖️",
    category: "negociação",
    difficulty: "avancado",
    xpReward: 300,
    requiredLevel: 8,
    estimatedMinutes: 40,
    lessons: [
      {
        id: "les-neg-1",
        title: "Princípios de Negociação",
        content: `## Princípios Fundamentais de Negociação

### 1. BATNA (Best Alternative To a Negotiated Agreement)
Sua melhor alternativa caso o deal não feche.
- Quanto melhor seu BATNA, mais poder você tem
- Nunca entre numa negociação sem conhecer seu BATNA

### 2. ZOPA (Zone of Possible Agreement)
A faixa onde ambos ganham:
\`\`\`
Seu mínimo: R$ 5.000/mês
Máximo deles: R$ 7.000/mês
ZOPA: R$ 5.000 - R$ 7.000
\`\`\`

### 3. Ancoragem
Quem fala o número primeiro ancora a negociação.
- Sempre ancore alto (mas justificável)
- Use dados e benchmarks para sustentar

### 4. Regra do "Nunca ceda de graça"
Cada concessão deve vir com uma contrapartida:
- "Consigo fazer R$ 4.500, mas precisaria de um contrato de 12 meses"
- "Posso reduzir o setup se fecharem até sexta"

### Frases proibidas em negociação:
❌ "Qual seu budget?" (muito cedo)
❌ "Posso fazer um desconto" (sem pedirem)
❌ "É o melhor que consigo" (elimina margem)`,
        type: "teoria",
        xpReward: 60,
      },
      {
        id: "les-neg-2",
        title: "Lidando com Pedidos de Desconto",
        content: `## Como Lidar com Pedidos de Desconto

### A regra de ouro:
> "Desconto não é uma estratégia. É uma falha na construção de valor."

### Framework DEAL para objeção de preço:

**D - Diagnosticar**
"Entendo. Quando você diz que está caro, comparado a quê?"

**E - Explorar o impacto**
"Quanto custa NÃO resolver esse problema?"

**A - Apresentar alternativas**
Ofereça opções, não descontos:
- Plano menor com menos features
- Pagamento anual vs mensal
- Reduzir escopo, não preço

**L - Legitimar o valor**
"O [Cliente X] tinha a mesma dúvida. Em 3 meses, o ROI foi de 4x."

### Exercício:
Seu prospect pede 30% de desconto. Monte 3 respostas diferentes usando o framework DEAL.`,
        type: "prática",
        xpReward: 70,
      },
    ],
  },
  {
    id: "mod-fechamento",
    title: "Técnicas de Fechamento",
    description:
      "Aprenda quando e como pedir o fechamento: trial close, assumptive close, e como criar urgência real.",
    icon: "🏁",
    category: "fechamento",
    difficulty: "avancado",
    xpReward: 300,
    requiredLevel: 10,
    estimatedMinutes: 35,
    lessons: [
      {
        id: "les-fech-1",
        title: "Os 5 Closes mais Eficazes",
        content: `## Os 5 Closes Mais Eficazes

### 1. Assumptive Close
Aja como se a decisão já foi tomada:
- "Vou preparar o contrato para início dia 1º. O e-mail do financeiro é qual?"
- Funciona quando: rapport alto + necessidade clara

### 2. Summary Close
Resuma todos os benefícios antes de pedir:
- "Então: vocês vão ter [benefício 1], [benefício 2], [benefício 3]. Faz sentido avançarmos?"

### 3. Urgency Close
Crie escassez REAL (nunca fake):
- "O preço de onboarding sobe dia 1º"
- "Só tenho 2 vagas para implementação esse mês"

### 4. Trial Close
Teste a temperatura antes do pedido final:
- "Se a gente resolver a questão do [objeção], vocês fechariam?"
- "Numa escala de 1-10, quão perto estamos?"

### 5. Takeaway Close
Retire a opção para gerar desejo:
- "Pensando melhor, talvez não seja o melhor momento para vocês"
- Funciona com perfis competitivos

### Quando NÃO fechar:
- Prospect não demonstrou dor real
- Não falou com o decisor
- Não entendeu o valor`,
        type: "teoria",
        xpReward: 60,
      },
    ],
  },
  {
    id: "mod-posvenda",
    title: "Pós-Venda e Expansão",
    description:
      "Transforme clientes em fãs: onboarding, success milestones, upsell e como gerar indicações consistentes.",
    icon: "🚀",
    category: "pós-venda",
    difficulty: "intermediario",
    xpReward: 200,
    requiredLevel: 6,
    estimatedMinutes: 25,
    lessons: [
      {
        id: "les-pos-1",
        title: "O Framework de Expansão de Receita",
        content: `## Expansão de Receita: Upsell, Cross-sell e Referral

### Por que expandir?
- Adquirir novo cliente custa 5-7x mais que expandir
- Cliente satisfeito é sua melhor fonte de leads
- NRR (Net Revenue Retention) > 100% = crescimento composto

### Os 3 motores de expansão:

**1. Upsell**
Quando: Cliente já usa e quer mais
- Limites do plano atingidos
- Novo departamento quer usar
- Trigger: "Vocês estão usando 90% da capacidade"

**2. Cross-sell**
Quando: Oferecer produto/serviço complementar
- Identificar dores adjacentes no dia-a-dia
- Trigger: "Vi que vocês também têm desafio com [X]"

**3. Referral (Indicação)**
Quando: NPS alto + resultado comprovado
- Peça no momento de pico de satisfação
- "Quem mais do seu network tem esse desafio?"
- Ofereça benefício mútuo (win-win)

### Métrica chave:
> **NRR = (MRR início + expansão - churn - downgrade) / MRR início × 100**
> Meta: > 110%`,
        type: "teoria",
        xpReward: 50,
      },
    ],
  },
  {
    id: "mod-mindset",
    title: "Mindset do Top Performer",
    description:
      "O que separa vendedores medianos dos top 1%: rotina, disciplina, gestão de rejeição e mentalidade de crescimento.",
    icon: "🧠",
    category: "mindset",
    difficulty: "iniciante",
    xpReward: 150,
    requiredLevel: 1,
    estimatedMinutes: 20,
    lessons: [
      {
        id: "les-mind-1",
        title: "A Rotina do Vendedor de Alta Performance",
        content: `## A Rotina do Vendedor de Alta Performance

### O dia ideal:

**🌅 Manhã (8h-12h) — Bloco de prospecção**
- 8h-8h30: Revisar pipeline e prioridades
- 8h30-10h: Cold calls (bloco ininterrupto)
- 10h-11h: Follow-ups e emails
- 11h-12h: Social selling (LinkedIn)

**🌞 Tarde (13h-17h) — Bloco de deals**
- 13h-15h: Reuniões de discovery/demo
- 15h-16h: Propostas e follow-ups
- 16h-16h30: Atualizar CRM
- 16h30-17h: Preparar próximo dia

**🌙 Final do dia (17h) — Reflexão**
- O que funcionou hoje?
- O que vou fazer diferente amanhã?
- 3 wins do dia (por menores que sejam)

### As 3 métricas que importam:
1. **Atividades** — Quantas ligações/emails fez?
2. **Conversões** — Quantas viraram reunião?
3. **Pipeline** — Quanto valor gerou?

### Sobre rejeição:
> "Cada 'não' te aproxima do próximo 'sim'."
> Um closer com 30% de taxa de conversão precisa de ~70 'nãos' para cada 30 'sins'.

A diferença entre top 1% e o resto? **Consistência, não talento.**`,
        type: "teoria",
        xpReward: 50,
      },
    ],
  },
];
