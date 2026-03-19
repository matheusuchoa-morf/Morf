import { SkillTask } from "@/types";

export const skillTasks: SkillTask[] = [
  // CARISMA
  {
    id: "skill-carisma-1",
    title: "Primeira Impressão",
    description: "Como causar uma ótima primeira impressão em uma cold call?",
    category: "carisma",
    difficulty: "iniciante",
    scenario:
      "Você está ligando pela primeira vez para um decisor de uma empresa de tecnologia. Ele atende o telefone com pressa. Como você se apresenta?",
    options: [
      {
        id: "c1-a",
        text: "Oi, tudo bem? Sou o João da empresa X e queria falar sobre nosso produto incrível que vai revolucionar sua empresa!",
        isCorrect: false,
        feedback:
          "Essa abordagem é genérica e auto-centrada. O prospect não quer ouvir sobre seu produto, quer resolver um problema.",
        statBonus: {},
      },
      {
        id: "c1-b",
        text: "Bom dia! Vi que vocês estão expandindo o time comercial. Conversei com empresas parecidas que enfrentaram [problema específico] nessa fase. Faz sentido trocar uma ideia de 2 minutos?",
        isCorrect: true,
        feedback:
          "Perfeito! Você mostrou pesquisa prévia, gerou curiosidade com prova social e pediu pouco tempo. Isso demonstra carisma e preparo.",
        statBonus: { carisma: 2, persuasao: 1 },
      },
      {
        id: "c1-c",
        text: "Oi, posso falar com o responsável por vendas? Tenho uma proposta urgente.",
        isCorrect: false,
        feedback:
          "Criar falsa urgência e não demonstrar conhecimento sobre o prospect gera desconfiança imediata.",
        statBonus: {},
      },
      {
        id: "c1-d",
        text: "Olá! Estou entrando em contato porque vocês se encaixam no perfil de clientes que mais crescem conosco. Quando podemos marcar uma demo?",
        isCorrect: false,
        feedback:
          "Pular direto para a demo sem entender a dor do prospect é agressivo demais. Primeiro construa rapport.",
        statBonus: { carisma: 1 },
      },
    ],
    xpReward: 30,
    statReward: { carisma: 2 },
    requiredLevel: 1,
  },
  {
    id: "skill-carisma-2",
    title: "Construindo Rapport",
    description: "Como criar conexão genuína com um prospect em 30 segundos?",
    category: "carisma",
    difficulty: "intermediario",
    scenario:
      "Você está em uma reunião de discovery com uma diretora de marketing. Ela parece ocupada e um pouco cética. Antes de entrar nos negócios, como você quebra o gelo?",
    options: [
      {
        id: "c2-a",
        text: "Vi no seu LinkedIn que você palestroi no RD Summit! Como foi a experiência? Eu assisti online e achei muito interessante o tema de growth.",
        isCorrect: true,
        feedback:
          "Excelente! Referência pesquisada + elogio genuíno + interesse real = rapport autêntico. Isso abre portas.",
        statBonus: { carisma: 3, networking: 1 },
      },
      {
        id: "c2-b",
        text: "Então, vamos direto ao ponto? Sei que você é ocupada, então vou apresentar nossa solução rapidamente.",
        isCorrect: false,
        feedback:
          "Embora respeitar o tempo seja bom, pular o rapport faz a reunião parecer transacional. Pessoas compram de quem confiam.",
        statBonus: { estrategia: 1 },
      },
      {
        id: "c2-c",
        text: "E aí, como está o tempo aí na sua cidade? Aqui está chovendo bastante!",
        isCorrect: false,
        feedback:
          "Small talk sobre clima é genérico e superficial. Prefira referências específicas sobre a pessoa ou empresa.",
        statBonus: {},
      },
      {
        id: "c2-d",
        text: "Antes de começar, quero dizer que admiro muito sua empresa. Vocês são os melhores do mercado!",
        isCorrect: false,
        feedback:
          "Elogios exagerados e genéricos soam bajuladores e não criam conexão real. Seja específico e autêntico.",
        statBonus: {},
      },
    ],
    xpReward: 40,
    statReward: { carisma: 3 },
    requiredLevel: 3,
  },

  // PERSUASÃO
  {
    id: "skill-persuasao-1",
    title: "Lidando com 'Está Caro'",
    description: "Como responder quando o prospect diz que o preço está alto?",
    category: "persuasao",
    difficulty: "intermediario",
    scenario:
      'Depois de uma ótima demo, o diretor financeiro diz: "Gostei da solução, mas está cara demais. Temos opções mais baratas no mercado." Como você responde?',
    options: [
      {
        id: "p1-a",
        text: "Entendo a preocupação com investimento. Me ajuda a entender: quando você compara com as alternativas, o que está levando em conta além do preço? Porque nossos clientes que migraram de soluções mais baratas perceberam que o custo total era maior por conta de X, Y e Z.",
        isCorrect: true,
        feedback:
          "Perfeito! Você validou a objeção, fez uma pergunta de redirecionamento e usou prova social para reframing de valor. Técnica de ancoragem reversa.",
        statBonus: { persuasao: 3, estrategia: 1 },
      },
      {
        id: "p1-b",
        text: "Posso falar com meu gerente para conseguir um desconto especial para fechar hoje.",
        isCorrect: false,
        feedback:
          "Dar desconto na primeira objeção destrói seu posicionamento de valor e treina o prospect a sempre pedir desconto.",
        statBonus: {},
      },
      {
        id: "p1-c",
        text: "Na verdade não é caro quando você pensa no ROI. Nosso produto se paga em 3 meses.",
        isCorrect: false,
        feedback:
          "Contradizer o prospect ('na verdade não é caro') cria resistência. É melhor validar primeiro e depois reposicionar.",
        statBonus: { persuasao: 1 },
      },
      {
        id: "p1-d",
        text: "Entendo. Quais funcionalidades você poderia abrir mão para caber no orçamento?",
        isCorrect: false,
        feedback:
          "Isso diminui o valor percebido do produto. Antes de reduzir escopo, explore se o orçamento é realmente o bloqueio real.",
        statBonus: { estrategia: 1 },
      },
    ],
    xpReward: 45,
    statReward: { persuasao: 3 },
    requiredLevel: 5,
  },
  {
    id: "skill-persuasao-2",
    title: "Criando Urgência Genuína",
    description: "Como criar senso de urgência sem ser manipulativo?",
    category: "persuasao",
    difficulty: "avancado",
    scenario:
      'O prospect disse que "precisa pensar" após a proposta. Ele está interessado mas paralisado na decisão. Como você cria urgência de forma ética?',
    options: [
      {
        id: "p2-a",
        text: "Sem problema! Só quero garantir que você tenha todos os dados para decidir. Me conta: o que acontece com a operação de vocês se essa decisão levar mais 3 meses? Aquele problema de [dor específica] que você mencionou, quanto está custando por mês?",
        isCorrect: true,
        feedback:
          "Brilhante! Você quantificou o custo da inação sem pressionar. O prospect se convence sozinho quando vê o impacto financeiro de não agir.",
        statBonus: { persuasao: 3, estrategia: 2 },
      },
      {
        id: "p2-b",
        text: "Entendo, mas essa condição especial só vale até sexta-feira. Depois o preço sobe 20%.",
        isCorrect: false,
        feedback:
          "Prazos artificiais são facilmente percebidos como manipulação. Isso destrói confiança a longo prazo.",
        statBonus: {},
      },
      {
        id: "p2-c",
        text: "Claro, pense com calma! Fico à disposição quando quiser avançar.",
        isCorrect: false,
        feedback:
          "Ser passivo demais faz o deal esfriar. Você precisa ajudar o prospect a avançar, não esperar sentado.",
        statBonus: {},
      },
      {
        id: "p2-d",
        text: "Temos só mais 2 vagas no onboarding desse trimestre. Recomendo garantir a sua.",
        isCorrect: false,
        feedback:
          "Se for verdade, pode funcionar. Mas geralmente soa como tática de pressão. Prefira urgência baseada na dor do prospect.",
        statBonus: { persuasao: 1 },
      },
    ],
    xpReward: 55,
    statReward: { persuasao: 4 },
    requiredLevel: 8,
  },

  // RESILIÊNCIA
  {
    id: "skill-resiliencia-1",
    title: "Dia Difícil de Prospecção",
    description: "Como manter a energia após múltiplas rejeições?",
    category: "resiliencia",
    difficulty: "iniciante",
    scenario:
      "Você fez 30 ligações hoje e tomou 28 'nãos'. Está frustrado e cansado. Faltam 2 horas para acabar o expediente. O que você faz?",
    options: [
      {
        id: "r1-a",
        text: "Continuo ligando do mesmo jeito. Vendas é um jogo de números, eventualmente alguém vai dizer sim.",
        isCorrect: false,
        feedback:
          "Persistência sem reflexão é insanidade. Se a taxa de conversão está muito baixa, algo no script ou na lista precisa mudar.",
        statBonus: { resiliencia: 1 },
      },
      {
        id: "r1-b",
        text: "Paro 10 minutos, reviso as ligações que não converteram para identificar padrões, ajusto minha abordagem e volto com energia renovada nas últimas 2 horas.",
        isCorrect: true,
        feedback:
          "Excelente! Resiliência inteligente = pausa estratégica + análise + ajuste. Top performers fazem exatamente isso. Você não desistiu, apenas recalculou a rota.",
        statBonus: { resiliencia: 3, estrategia: 1 },
      },
      {
        id: "r1-c",
        text: "Desisto das ligações e uso o tempo restante para prospectar por email, que é menos desgastante.",
        isCorrect: false,
        feedback:
          "Trocar de canal pode ser estratégico, mas nesse contexto parece fuga. Enfrente o desconforto e melhore seu approach.",
        statBonus: {},
      },
      {
        id: "r1-d",
        text: "Vou conversar com meu gestor para reclamar que a lista de leads está ruim.",
        isCorrect: false,
        feedback:
          "Culpar fatores externos antes de olhar para dentro é uma armadilha. Primeiro analise sua própria performance.",
        statBonus: {},
      },
    ],
    xpReward: 30,
    statReward: { resiliencia: 2 },
    requiredLevel: 1,
  },
  {
    id: "skill-resiliencia-2",
    title: "Deal Perdido",
    description: "Como reagir quando perde um deal grande?",
    category: "resiliencia",
    difficulty: "intermediario",
    scenario:
      "Você trabalhou 3 meses em um deal de R$200k e perdeu para a concorrência no último minuto. Seu gestor pede um post-mortem. Como você lida com isso?",
    options: [
      {
        id: "r2-a",
        text: "Faço o post-mortem focando nos fatores externos: o concorrente baixou o preço, o champion interno mudou de cargo, o timing não era ideal.",
        isCorrect: false,
        feedback:
          "Post-mortem com foco externo não gera aprendizado. Top performers assumem responsabilidade pelo que poderiam ter feito diferente.",
        statBonus: {},
      },
      {
        id: "r2-b",
        text: "Analiso honestamente: onde perdi o controle do processo? Tive acesso ao decisor econômico? Mapeei a concorrência cedo o suficiente? Documento as lições e ajusto meu playbook para o próximo deal enterprise.",
        isCorrect: true,
        feedback:
          "Mentalidade de campeão! Auto-análise honesta, documentação de lições e melhoria do processo. Cada deal perdido é um MBA gratuito em vendas.",
        statBonus: { resiliencia: 3, estrategia: 2 },
      },
      {
        id: "r2-c",
        text: "Aceito a perda e parto para o próximo deal. Não adianta chorar pelo leite derramado.",
        isCorrect: false,
        feedback:
          "Seguir em frente é bom, mas sem análise você vai repetir os mesmos erros. Resiliência sem reflexão é desperdício.",
        statBonus: { resiliencia: 1 },
      },
      {
        id: "r2-d",
        text: "Ligo para o prospect e ofereço um desconto agressivo para tentar reverter a decisão.",
        isCorrect: false,
        feedback:
          "Desesperação pós-decisão destrói credibilidade. Se o deal foi perdido, extraia aprendizado e mantenha a porta aberta para o futuro.",
        statBonus: {},
      },
    ],
    xpReward: 45,
    statReward: { resiliencia: 3 },
    requiredLevel: 5,
  },

  // ESTRATÉGIA
  {
    id: "skill-estrategia-1",
    title: "Qualificação BANT",
    description: "Como qualificar um lead de forma eficiente?",
    category: "estrategia",
    difficulty: "iniciante",
    scenario:
      'Um lead inbound preencheu o formulário pedindo demo. No discovery, ele diz: "Estamos avaliando soluções para o próximo ano." Como você qualifica usando BANT?',
    options: [
      {
        id: "e1-a",
        text: "Legal! Vou agendar a demo para você conhecer nossa solução. Depois a gente vê os detalhes.",
        isCorrect: false,
        feedback:
          "Pular a qualificação para fazer demo é receita de desperdício de tempo. Você pode passar 1 hora apresentando para alguém sem budget ou urgência.",
        statBonus: {},
      },
      {
        id: "e1-b",
        text: "Qual é o orçamento de vocês? Quem decide? Quando precisa resolver? Qual o problema?",
        isCorrect: false,
        feedback:
          "Perguntas diretas demais, em sequência de interrogatório, criam resistência. BANT é um framework, não um checklist para disparar.",
        statBonus: { estrategia: 1 },
      },
      {
        id: "e1-c",
        text: "Interessante! Me conta mais: o que motivou a busca por uma solução agora? Já têm uma ideia de investimento para esse projeto? E quem mais da equipe estaria envolvido nessa decisão?",
        isCorrect: true,
        feedback:
          "Perfeito! Perguntas conversacionais que cobrem Need, Budget e Authority de forma natural. O 'agora' revela o Timeline. Qualificação inteligente.",
        statBonus: { estrategia: 3, carisma: 1 },
      },
      {
        id: "e1-d",
        text: "Antes da demo, preciso entender se faz sentido para os dois lados. Pode me dizer qual é o budget aprovado para essa iniciativa?",
        isCorrect: false,
        feedback:
          "Perguntar budget logo de cara pode ser agressivo. Comece entendendo a dor e o contexto, o budget virá naturalmente.",
        statBonus: { estrategia: 1 },
      },
    ],
    xpReward: 35,
    statReward: { estrategia: 2 },
    requiredLevel: 1,
  },
  {
    id: "skill-estrategia-2",
    title: "Multi-Threading",
    description: "Como envolver múltiplos stakeholders no deal?",
    category: "estrategia",
    difficulty: "avancado",
    scenario:
      "Você está negociando com o gerente de vendas (seu champion), mas o CFO tem a palavra final e você nunca falou com ele. O deal está estagnado há 2 semanas. Como você faz multi-threading?",
    options: [
      {
        id: "e2-a",
        text: "Peço para meu champion marcar uma reunião com o CFO, explicando que preciso apresentar o business case diretamente para ele avançar a decisão.",
        isCorrect: false,
        feedback:
          "Pedir acesso direto sem dar ferramentas ao champion pode criar atrito. Ele pode se sentir \"bypassado\" ou não saber como posicionar internamente.",
        statBonus: { estrategia: 1 },
      },
      {
        id: "e2-b",
        text: "Crio um business case personalizado com ROI calculado para o CFO. Peço ao champion para enviar como se fosse dele, e sugiro uma reunião de 15 min para alinhar os números. Ofereço preparar o champion para essa conversa.",
        isCorrect: true,
        feedback:
          "Multi-threading avançado! Você empoderou seu champion com material executivo, manteve ele como herói interno, e criou uma razão lógica para o CFO participar. Estratégia de elite.",
        statBonus: { estrategia: 4, persuasao: 2 },
      },
      {
        id: "e2-c",
        text: "Envio um email direto para o CFO me apresentando e pedindo 15 minutos do tempo dele.",
        isCorrect: false,
        feedback:
          "Ir direto ao CFO sem alinhamento com seu champion é perigoso. Pode ser visto como falta de confiança e gerar conflito interno.",
        statBonus: {},
      },
      {
        id: "e2-d",
        text: "Espero mais uma semana. Se o champion não conseguir avançar internamente, aí sim tomo uma ação diferente.",
        isCorrect: false,
        feedback:
          "Passividade mata deals. Cada dia de inação é um dia a mais para o concorrente agir ou o projeto ser desprioritizado.",
        statBonus: {},
      },
    ],
    xpReward: 60,
    statReward: { estrategia: 4 },
    requiredLevel: 10,
  },

  // NETWORKING
  {
    id: "skill-networking-1",
    title: "Networking em Eventos",
    description: "Como fazer networking efetivo em eventos de negócios?",
    category: "networking",
    difficulty: "iniciante",
    scenario:
      "Você está em um evento de vendas e vê o VP de vendas de uma empresa que é seu ICP. Ele está sozinho tomando café. Como você aborda?",
    options: [
      {
        id: "n1-a",
        text: "Chego com meu cartão de visitas e pitch de elevador pronto: 'Oi, sou da empresa X, a gente ajuda empresas como a sua a aumentar receita em 40%.'",
        isCorrect: false,
        feedback:
          "Abordagem comercial em evento de networking afasta as pessoas. Ninguém gosta de ser 'vendido' no coffee break.",
        statBonus: {},
      },
      {
        id: "n1-b",
        text: "'Oi! O que achou da última palestra? Achei interessante o ponto sobre [tema]. Você tem visto isso na prática na sua operação?'",
        isCorrect: true,
        feedback:
          "Natural, contextual e genuíno! Você criou uma conversa sobre um tema compartilhado, demonstrou interesse na perspectiva dele e abriu espaço para uma conexão real.",
        statBonus: { networking: 3, carisma: 1 },
      },
      {
        id: "n1-c",
        text: "Espero ele se sentar e me sento na mesa dele, me apresento e pergunto sobre o crescimento da empresa.",
        isCorrect: false,
        feedback:
          "Invadir o espaço pessoal e fazer perguntas diretas sobre a empresa pode parecer invasivo em um contexto social.",
        statBonus: { networking: 1 },
      },
      {
        id: "n1-d",
        text: "Tiro uma foto dele à distância e mando uma mensagem no LinkedIn: 'Vi você no evento! Vamos conectar?'",
        isCorrect: false,
        feedback:
          "Isso é estranho e pode parecer stalking. Se está no mesmo evento, aproveite para conversar pessoalmente.",
        statBonus: {},
      },
    ],
    xpReward: 30,
    statReward: { networking: 2 },
    requiredLevel: 1,
  },
  {
    id: "skill-networking-2",
    title: "Follow-up Estratégico",
    description: "Como manter relacionamentos vivos após o primeiro contato?",
    category: "networking",
    difficulty: "intermediario",
    scenario:
      "Você conheceu uma diretora de RH em um evento há 2 semanas. Trocaram LinkedIn. Ela não é prospect direta, mas conhece muitos decisores do seu ICP. Como você mantém o relacionamento?",
    options: [
      {
        id: "n2-a",
        text: "Mando uma mensagem pedindo indicações: 'Oi Maria! Lembrei de você. Conhece alguém que precise de [minha solução]?'",
        isCorrect: false,
        feedback:
          "Pedir indicação sem dar valor antes é transacional. Networking é sobre dar primeiro, receber depois.",
        statBonus: {},
      },
      {
        id: "n2-b",
        text: "Compartilho um artigo relevante sobre tendências de RH com uma nota pessoal: 'Maria, lembrei da nossa conversa sobre [tema] quando li isso. Achei que você ia curtir!' E periodicamente interajo com posts dela.",
        isCorrect: true,
        feedback:
          "Networking de alto nível! Você agregou valor, foi pessoal e mantém a relação quente de forma orgânica. As indicações virão naturalmente quando ela confiar em você.",
        statBonus: { networking: 3, carisma: 1 },
      },
      {
        id: "n2-c",
        text: "Adiciono no meu CRM e coloco um lembrete para ligar em 6 meses.",
        isCorrect: false,
        feedback:
          "6 meses sem contato significa que ela já esqueceu de você. Networking exige nutrição constante.",
        statBonus: { estrategia: 1 },
      },
      {
        id: "n2-d",
        text: "Convido para um café para entender melhor o mercado de RH e como posso ajudar empresas do segmento.",
        isCorrect: false,
        feedback:
          "Não é ruim, mas é cedo para pedir tempo presencial. Comece nutrindo online e evolua para offline naturalmente.",
        statBonus: { networking: 1 },
      },
    ],
    xpReward: 40,
    statReward: { networking: 3 },
    requiredLevel: 4,
  },
];
