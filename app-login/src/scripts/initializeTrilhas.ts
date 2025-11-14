import { seedTrilha } from '../services/trilhaService';
import { CreateTrilhaRequest } from '../types/Trilha';

const TRILHAS_SEED: CreateTrilhaRequest[] = [
  {
    title: 'Fundamentos de Inteligência Artificial',
    description:
      'Aprenda os conceitos essenciais de IA, incluindo aprendizado de máquina, redes neurais e aplicações práticas.',
    category: 'Tecnologia',
    level: 'iniciante',
    duration: '12 horas',
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    title: 'Transição de Carreira para Análise de Dados',
    description:
      'Guia completo para migrar para a área de Data Analytics, com ferramentas e exercícios práticos.',
    category: 'Dados',
    level: 'iniciante',
    duration: '16 horas',
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    title: 'Produtividade e Automação com IA',
    description:
      'Utilize IA para automatizar tarefas e aumentar sua produtividade no trabalho.',
    category: 'Produtividade',
    level: 'iniciante',
    duration: '8 horas',
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    title: 'Desenvolvimento Web para Iniciantes',
    description:
      'Fundamentos de HTML, CSS e JavaScript para criar interfaces web modernas.',
    category: 'Programação',
    level: 'iniciante',
    duration: '20 horas',
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    title: 'Introdução à Programação com Python',
    description:
      'Aprenda lógica de programação e fundamentos do Python, uma das linguagens mais usadas no mundo.',
    category: 'Programação',
    level: 'iniciante',
    duration: '18 horas',
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    title: 'UX/UI Design para Novos Profissionais',
    description:
      'Conceitos essenciais de experiência do usuário e design de interfaces.',
    category: 'Design',
    level: 'iniciante',
    duration: '14 horas',
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    title: 'Introdução ao Cloud Computing',
    description:
      'Conceitos fundamentais de computação em nuvem e principais provedores (AWS, Azure, Google Cloud).',
    category: 'Tecnologia',
    level: 'iniciante',
    duration: '10 horas',
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    title: 'Primeiros Passos com Banco de Dados',
    description:
      'SQL, modelagem de dados, consultas básicas e boas práticas.',
    category: 'Dados',
    level: 'iniciante',
    duration: '12 horas',
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    title: 'Marketing Digital para Iniciantes',
    description:
      'Fundamentos de SEO, redes sociais, métricas e criação de presença digital.',
    category: 'Marketing',
    level: 'iniciante',
    duration: '10 horas',
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    title: 'Fundamentos de Cibersegurança',
    description:
      'Aprenda como funcionam ataques, proteção de dados, criptografia e práticas seguras.',
    category: 'Segurança',
    level: 'iniciante',
    duration: '15 horas',
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    title: 'Gestão de Projetos com Metodologias Ágeis',
    description:
      'Scrum, Kanban, squads e o papel dos principais profissionais.',
    category: 'Gestão',
    level: 'iniciante',
    duration: '9 horas',
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    title: 'Noções de Lógica de Programação',
    description:
      'Variáveis, loops, condicionais e resolução de problemas.',
    category: 'Programação',
    level: 'iniciante',
    duration: '6 horas',
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    title: 'Introdução ao Machine Learning',
    description:
      'Conceitos básicos de ML, regressão, classificação e preparação de dados.',
    category: 'Dados',
    level: 'intermediário',
    duration: '18 horas',
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    title: 'Comunicação Eficaz no Ambiente de Trabalho',
    description:
      'Aprenda técnicas de comunicação, feedback e colaboração.',
    category: 'Soft Skills',
    level: 'iniciante',
    duration: '5 horas',
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    title: 'Transformação Digital nas Empresas',
    description:
      'Entenda como negócios utilizam tecnologia, automação e IA para evoluir.',
    category: 'Negócios',
    level: 'intermediário',
    duration: '11 horas',
    imageUrl: 'https://placehold.co/600x400',
  },
];

export const initializeTrilhas = async (): Promise<void> => {
  for (const trilha of TRILHAS_SEED) {
    await seedTrilha(trilha);
  }
};


