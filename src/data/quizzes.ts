import { QuizQuestion } from "@/types";

export const quizzes: Record<string, QuizQuestion[]> = {
  "les-prosp-3": [
    {
      id: "q1",
      question: "Qual o principal objetivo do primeiro contato em prospecção ativa?",
      options: [
        "Fechar a venda imediatamente",
        "Gerar curiosidade e iniciar uma conversa",
        "Enviar uma proposta comercial",
        "Apresentar todos os features do produto",
      ],
      correctAnswer: 1,
      explanation:
        "O objetivo do primeiro contato é gerar curiosidade e iniciar uma conversa relevante, não fechar negócio.",
      xpReward: 15,
    },
    {
      id: "q2",
      question: "O que significa ICP?",
      options: [
        "Internal Customer Process",
        "Ideal Customer Profile",
        "Integrated Communication Plan",
        "Initial Contact Protocol",
      ],
      correctAnswer: 1,
      explanation:
        "ICP = Ideal Customer Profile (Perfil de Cliente Ideal). É o perfil de empresa que mais se beneficia do seu produto.",
      xpReward: 15,
    },
    {
      id: "q3",
      question: "Quais são os principais canais de prospecção outbound?",
      options: [
        "TV, rádio e jornal",
        "Cold call, cold email, social selling e referral",
        "Google Ads e Facebook Ads",
        "SEO e marketing de conteúdo",
      ],
      correctAnswer: 1,
      explanation:
        "Os 4 canais principais de prospecção outbound são: cold call, cold email, social selling (LinkedIn) e referral (indicações).",
      xpReward: 15,
    },
    {
      id: "q4",
      question:
        "Na matriz ICP, qual critério NÃO é tipicamente avaliado?",
      options: [
        "Segmento da empresa",
        "Orçamento disponível",
        "Cor do logo da empresa",
        "Fit técnico com o produto",
      ],
      correctAnswer: 2,
      explanation:
        "A cor do logo não é um critério relevante para qualificação. Os critérios reais incluem segmento, tamanho, budget e fit técnico.",
      xpReward: 15,
    },
  ],
};
