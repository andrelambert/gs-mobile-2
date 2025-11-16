import { collection, doc, setDoc, updateDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { TrilhaDetalhada } from '../types/TrilhaDetalhada';

const TRILHAS_DETALHADAS: Omit<TrilhaDetalhada, 'id'>[] = [
  {
    title: 'Fundamentos de Python para Análise de Dados',
    description: 'Aprenda Python do zero e domine bibliotecas essenciais como Pandas e NumPy.',
    category: 'Dados',
    duration: '40 horas',
    level: 'iniciante',
    imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
    descricaoDetalhada: 'Este curso completo de Python foi desenvolvido para quem deseja iniciar sua carreira em análise de dados. Você aprenderá desde os conceitos básicos da linguagem até técnicas avançadas de manipulação e visualização de dados. Com projetos práticos e exercícios hands-on, você estará preparado para enfrentar desafios reais do mercado.',
    objetivos: [
      'Dominar a sintaxe e estruturas de dados do Python',
      'Manipular e limpar dados com Pandas',
      'Criar visualizações impactantes com Matplotlib e Seaborn',
      'Realizar análises estatísticas básicas',
      'Desenvolver projetos completos de análise de dados'
    ],
    prerequisitos: [
      'Conhecimentos básicos de informática',
      'Raciocínio lógico',
      'Vontade de aprender'
    ],
    totalHoras: 40,
    totalVideos: 85,
    totalExercicios: 45,
    totalProjetos: 5,
    temCertificado: true,
    temTextosComplementares: true,
    temSuporteInstrutor: true,
    temForumDiscussao: true,
    instrutor: {
      nome: 'Dr. Carlos Silva',
      bio: 'PhD em Ciência da Computação com 15 anos de experiência em análise de dados',
      especialidade: 'Data Science e Machine Learning'
    },
    modulos: [
      {
        id: 'm1',
        titulo: 'Introdução ao Python',
        descricao: 'Fundamentos da linguagem Python',
        conteudos: [
          { id: 'c1', titulo: 'Instalação e Configuração do Ambiente', tipo: 'video', duracao: '15 min' },
          { id: 'c2', titulo: 'Variáveis e Tipos de Dados', tipo: 'video', duracao: '25 min' },
          { id: 'c3', titulo: 'Estruturas de Controle', tipo: 'video', duracao: '30 min' },
          { id: 'c4', titulo: 'Exercícios Práticos - Básico', tipo: 'exercicio' },
          { id: 'c5', titulo: 'Quiz de Fixação', tipo: 'quiz' }
        ]
      },
      {
        id: 'm2',
        titulo: 'Manipulação de Dados com Pandas',
        descricao: 'Aprenda a trabalhar com DataFrames',
        conteudos: [
          { id: 'c6', titulo: 'Introdução ao Pandas', tipo: 'video', duracao: '20 min' },
          { id: 'c7', titulo: 'Leitura e Escrita de Arquivos', tipo: 'video', duracao: '25 min' },
          { id: 'c8', titulo: 'Limpeza de Dados', tipo: 'video', duracao: '35 min' },
          { id: 'c9', titulo: 'Projeto: Análise de Vendas', tipo: 'projeto' }
        ]
      },
      {
        id: 'm3',
        titulo: 'Visualização de Dados',
        descricao: 'Crie gráficos profissionais',
        conteudos: [
          { id: 'c10', titulo: 'Matplotlib Essencial', tipo: 'video', duracao: '30 min' },
          { id: 'c11', titulo: 'Seaborn Avançado', tipo: 'video', duracao: '25 min' },
          { id: 'c12', titulo: 'Projeto Final: Dashboard Interativo', tipo: 'projeto' }
        ]
      }
    ],
    numeroAvaliacoes: 1247,
    avaliacaoMedia: 4.8,
    numeroAlunos: 8934,
    ultimaAtualizacao: '2025-01-10'
  },
  {
    title: 'Desenvolvimento Web Full Stack com React e Node.js',
    description: 'Construa aplicações web modernas do frontend ao backend.',
    category: 'Tecnologia',
    duration: '60 horas',
    level: 'intermediário',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    descricaoDetalhada: 'Torne-se um desenvolvedor Full Stack completo! Este curso abrangente cobre desde os fundamentos do React até a criação de APIs robustas com Node.js. Você aprenderá as melhores práticas do mercado e desenvolverá projetos reais que podem ser incluídos em seu portfólio.',
    objetivos: [
      'Criar interfaces modernas e responsivas com React',
      'Desenvolver APIs RESTful com Node.js e Express',
      'Trabalhar com bancos de dados SQL e NoSQL',
      'Implementar autenticação e autorização',
      'Deploy de aplicações em produção'
    ],
    prerequisitos: [
      'HTML, CSS e JavaScript básico',
      'Conhecimento de Git',
      'Familiaridade com linha de comando'
    ],
    totalHoras: 60,
    totalVideos: 120,
    totalExercicios: 65,
    totalProjetos: 8,
    temCertificado: true,
    temTextosComplementares: true,
    temSuporteInstrutor: true,
    temForumDiscussao: true,
    instrutor: {
      nome: 'Ana Paula Costa',
      bio: 'Engenheira de Software Sênior com experiência em startups e grandes empresas',
      especialidade: 'Desenvolvimento Web e Arquitetura de Software'
    },
    modulos: [
      {
        id: 'm1',
        titulo: 'React Fundamentals',
        descricao: 'Domine os conceitos essenciais do React',
        conteudos: [
          { id: 'c1', titulo: 'Componentes e Props', tipo: 'video', duracao: '30 min' },
          { id: 'c2', titulo: 'State e Lifecycle', tipo: 'video', duracao: '35 min' },
          { id: 'c3', titulo: 'Hooks Essenciais', tipo: 'video', duracao: '40 min' },
          { id: 'c4', titulo: 'Exercícios: Todo App', tipo: 'exercicio' }
        ]
      },
      {
        id: 'm2',
        titulo: 'Backend com Node.js',
        descricao: 'Construa APIs profissionais',
        conteudos: [
          { id: 'c5', titulo: 'Express.js Básico', tipo: 'video', duracao: '25 min' },
          { id: 'c6', titulo: 'MongoDB e Mongoose', tipo: 'video', duracao: '35 min' },
          { id: 'c7', titulo: 'Autenticação JWT', tipo: 'video', duracao: '40 min' },
          { id: 'c8', titulo: 'Projeto: API de E-commerce', tipo: 'projeto' }
        ]
      },
      {
        id: 'm3',
        titulo: 'Integração e Deploy',
        descricao: 'Conecte frontend e backend',
        conteudos: [
          { id: 'c9', titulo: 'Consumindo APIs no React', tipo: 'video', duracao: '30 min' },
          { id: 'c10', titulo: 'Deploy na Vercel e Heroku', tipo: 'video', duracao: '25 min' },
          { id: 'c11', titulo: 'Projeto Final: Rede Social', tipo: 'projeto' }
        ]
      }
    ],
    numeroAvaliacoes: 2156,
    avaliacaoMedia: 4.9,
    numeroAlunos: 12458,
    ultimaAtualizacao: '2025-01-15'
  },
  {
    title: 'Machine Learning Aplicado',
    description: 'Implemente algoritmos de ML e crie modelos preditivos.',
    category: 'IA',
    duration: '50 horas',
    level: 'avançado',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400',
    descricaoDetalhada: 'Mergulhe no fascinante mundo do Machine Learning! Este curso avançado ensina como construir, treinar e otimizar modelos de aprendizado de máquina. Com foco em aplicações práticas, você trabalhará com datasets reais e aprenderá técnicas utilizadas por cientistas de dados nas maiores empresas do mundo.',
    objetivos: [
      'Implementar algoritmos de ML do zero',
      'Trabalhar com Scikit-learn e TensorFlow',
      'Realizar feature engineering eficaz',
      'Otimizar hiperparâmetros de modelos',
      'Deployar modelos em produção'
    ],
    prerequisitos: [
      'Python intermediário',
      'Estatística básica',
      'Álgebra linear básica',
      'Experiência com Pandas e NumPy'
    ],
    totalHoras: 50,
    totalVideos: 95,
    totalExercicios: 55,
    totalProjetos: 6,
    temCertificado: true,
    temTextosComplementares: true,
    temSuporteInstrutor: true,
    temForumDiscussao: true,
    instrutor: {
      nome: 'Prof. Roberto Mendes',
      bio: 'Cientista de Dados com publicações em conferências internacionais',
      especialidade: 'Machine Learning e Deep Learning'
    },
    modulos: [
      {
        id: 'm1',
        titulo: 'Fundamentos de ML',
        descricao: 'Conceitos essenciais de aprendizado de máquina',
        conteudos: [
          { id: 'c1', titulo: 'Tipos de Aprendizado', tipo: 'video', duracao: '20 min' },
          { id: 'c2', titulo: 'Preparação de Dados', tipo: 'video', duracao: '30 min' },
          { id: 'c3', titulo: 'Métricas de Avaliação', tipo: 'video', duracao: '25 min' },
          { id: 'c4', titulo: 'Quiz Conceitual', tipo: 'quiz' }
        ]
      },
      {
        id: 'm2',
        titulo: 'Algoritmos Supervisionados',
        descricao: 'Regressão e classificação',
        conteudos: [
          { id: 'c5', titulo: 'Regressão Linear e Logística', tipo: 'video', duracao: '35 min' },
          { id: 'c6', titulo: 'Decision Trees e Random Forest', tipo: 'video', duracao: '40 min' },
          { id: 'c7', titulo: 'SVM e KNN', tipo: 'video', duracao: '30 min' },
          { id: 'c8', titulo: 'Projeto: Previsão de Churn', tipo: 'projeto' }
        ]
      },
      {
        id: 'm3',
        titulo: 'Deep Learning',
        descricao: 'Redes neurais artificiais',
        conteudos: [
          { id: 'c9', titulo: 'Introdução às Redes Neurais', tipo: 'video', duracao: '35 min' },
          { id: 'c10', titulo: 'CNNs para Visão Computacional', tipo: 'video', duracao: '45 min' },
          { id: 'c11', titulo: 'Projeto Final: Classificador de Imagens', tipo: 'projeto' }
        ]
      }
    ],
    numeroAvaliacoes: 892,
    avaliacaoMedia: 4.7,
    numeroAlunos: 5621,
    ultimaAtualizacao: '2025-01-08'
  },
  {
    title: 'Design Thinking e Inovação',
    description: 'Desenvolva soluções criativas para problemas complexos.',
    category: 'Soft Skills',
    duration: '25 horas',
    level: 'iniciante',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
    descricaoDetalhada: 'Aprenda a metodologia que revolucionou a forma como empresas inovam! Este curso ensina Design Thinking de forma prática e aplicável, com cases reais e exercícios que desenvolvem sua capacidade de resolver problemas de forma criativa e centrada no usuário.',
    objetivos: [
      'Compreender as 5 etapas do Design Thinking',
      'Aplicar técnicas de empatia e pesquisa com usuários',
      'Facilitar sessões de brainstorming eficazes',
      'Criar protótipos rápidos e validar ideias',
      'Implementar cultura de inovação'
    ],
    prerequisitos: [
      'Nenhum conhecimento prévio necessário',
      'Mente aberta para novas ideias',
      'Vontade de colaborar'
    ],
    totalHoras: 25,
    totalVideos: 48,
    totalExercicios: 30,
    totalProjetos: 4,
    temCertificado: true,
    temTextosComplementares: true,
    temSuporteInstrutor: false,
    temForumDiscussao: true,
    instrutor: {
      nome: 'Marina Oliveira',
      bio: 'Consultora de Inovação e facilitadora certificada em Design Thinking',
      especialidade: 'Design Thinking e Gestão da Inovação'
    },
    modulos: [
      {
        id: 'm1',
        titulo: 'Introdução ao Design Thinking',
        descricao: 'Fundamentos e mindset',
        conteudos: [
          { id: 'c1', titulo: 'O que é Design Thinking?', tipo: 'video', duracao: '15 min' },
          { id: 'c2', titulo: 'Casos de Sucesso', tipo: 'video', duracao: '20 min' },
          { id: 'c3', titulo: 'Leitura: História do Design Thinking', tipo: 'texto' }
        ]
      },
      {
        id: 'm2',
        titulo: 'As 5 Etapas',
        descricao: 'Empatizar, Definir, Idear, Prototipar, Testar',
        conteudos: [
          { id: 'c4', titulo: 'Empatia e Pesquisa', tipo: 'video', duracao: '25 min' },
          { id: 'c5', titulo: 'Definição do Problema', tipo: 'video', duracao: '20 min' },
          { id: 'c6', titulo: 'Ideação Criativa', tipo: 'video', duracao: '30 min' },
          { id: 'c7', titulo: 'Prototipagem Rápida', tipo: 'video', duracao: '25 min' },
          { id: 'c8', titulo: 'Testes e Validação', tipo: 'video', duracao: '20 min' },
          { id: 'c9', titulo: 'Exercício: Redesign de Produto', tipo: 'exercicio' }
        ]
      },
      {
        id: 'm3',
        titulo: 'Projeto Prático',
        descricao: 'Aplique tudo que aprendeu',
        conteudos: [
          { id: 'c10', titulo: 'Briefing do Projeto', tipo: 'texto' },
          { id: 'c11', titulo: 'Projeto Final: Solução Inovadora', tipo: 'projeto' }
        ]
      }
    ],
    numeroAvaliacoes: 1543,
    avaliacaoMedia: 4.6,
    numeroAlunos: 9876,
    ultimaAtualizacao: '2024-12-20'
  },
  {
    title: 'SQL para Análise de Dados',
    description: 'Domine consultas SQL e análise de bancos de dados relacionais.',
    category: 'Dados',
    duration: '30 horas',
    level: 'iniciante',
    imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400',
    descricaoDetalhada: 'SQL é a linguagem mais importante para quem trabalha com dados! Neste curso você aprenderá desde consultas básicas até técnicas avançadas de otimização e análise. Com exercícios práticos em bancos de dados reais, você estará pronto para extrair insights valiosos de qualquer base de dados.',
    objetivos: [
      'Escrever consultas SQL eficientes',
      'Realizar JOINs complexos',
      'Criar agregações e relatórios',
      'Otimizar performance de queries',
      'Trabalhar com subqueries e CTEs'
    ],
    prerequisitos: [
      'Conhecimentos básicos de informática',
      'Lógica de programação básica'
    ],
    totalHoras: 30,
    totalVideos: 62,
    totalExercicios: 80,
    totalProjetos: 3,
    temCertificado: true,
    temTextosComplementares: true,
    temSuporteInstrutor: true,
    temForumDiscussao: true,
    instrutor: {
      nome: 'Felipe Santos',
      bio: 'DBA e Analista de Dados com 10 anos de experiência',
      especialidade: 'Bancos de Dados e Business Intelligence'
    },
    modulos: [
      {
        id: 'm1',
        titulo: 'SQL Básico',
        descricao: 'Primeiras consultas',
        conteudos: [
          { id: 'c1', titulo: 'SELECT, FROM, WHERE', tipo: 'video', duracao: '20 min' },
          { id: 'c2', titulo: 'ORDER BY e LIMIT', tipo: 'video', duracao: '15 min' },
          { id: 'c3', titulo: '50 Exercícios Práticos', tipo: 'exercicio' }
        ]
      },
      {
        id: 'm2',
        titulo: 'JOINs e Agregações',
        descricao: 'Combine tabelas e agregue dados',
        conteudos: [
          { id: 'c4', titulo: 'INNER, LEFT, RIGHT JOIN', tipo: 'video', duracao: '30 min' },
          { id: 'c5', titulo: 'GROUP BY e HAVING', tipo: 'video', duracao: '25 min' },
          { id: 'c6', titulo: 'Funções de Agregação', tipo: 'video', duracao: '20 min' },
          { id: 'c7', titulo: 'Projeto: Análise de Vendas', tipo: 'projeto' }
        ]
      },
      {
        id: 'm3',
        titulo: 'SQL Avançado',
        descricao: 'Técnicas profissionais',
        conteudos: [
          { id: 'c8', titulo: 'Subqueries e CTEs', tipo: 'video', duracao: '35 min' },
          { id: 'c9', titulo: 'Window Functions', tipo: 'video', duracao: '30 min' },
          { id: 'c10', titulo: 'Projeto Final: Dashboard de Métricas', tipo: 'projeto' }
        ]
      }
    ],
    numeroAvaliacoes: 2034,
    avaliacaoMedia: 4.8,
    numeroAlunos: 11234,
    ultimaAtualizacao: '2025-01-12'
  },
  {
    title: 'Cloud Computing com AWS',
    description: 'Aprenda a arquitetar e gerenciar infraestrutura na nuvem.',
    category: 'Tecnologia',
    duration: '45 horas',
    level: 'intermediário',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
    descricaoDetalhada: 'A computação em nuvem é o futuro da infraestrutura de TI! Este curso completo sobre AWS ensina desde os conceitos fundamentais até arquiteturas complexas e escaláveis. Você aprenderá a utilizar os principais serviços da AWS e estará preparado para a certificação AWS Solutions Architect Associate.',
    objetivos: [
      'Compreender os fundamentos de cloud computing',
      'Configurar e gerenciar serviços AWS',
      'Implementar arquiteturas escaláveis e seguras',
      'Otimizar custos na nuvem',
      'Preparar-se para certificação AWS'
    ],
    prerequisitos: [
      'Conhecimentos básicos de redes',
      'Familiaridade com Linux',
      'Conceitos de programação'
    ],
    totalHoras: 45,
    totalVideos: 88,
    totalExercicios: 42,
    totalProjetos: 7,
    temCertificado: true,
    temTextosComplementares: true,
    temSuporteInstrutor: true,
    temForumDiscussao: true,
    instrutor: {
      nome: 'Lucas Ferreira',
      bio: 'AWS Certified Solutions Architect Professional',
      especialidade: 'Cloud Computing e DevOps'
    },
    modulos: [
      {
        id: 'm1',
        titulo: 'Fundamentos AWS',
        descricao: 'Introdução aos serviços principais',
        conteudos: [
          { id: 'c1', titulo: 'Visão Geral da AWS', tipo: 'video', duracao: '25 min' },
          { id: 'c2', titulo: 'EC2: Máquinas Virtuais', tipo: 'video', duracao: '35 min' },
          { id: 'c3', titulo: 'S3: Armazenamento de Objetos', tipo: 'video', duracao: '30 min' },
          { id: 'c4', titulo: 'Exercício: Deploy de Aplicação', tipo: 'exercicio' }
        ]
      },
      {
        id: 'm2',
        titulo: 'Redes e Segurança',
        descricao: 'VPC, Security Groups e IAM',
        conteudos: [
          { id: 'c5', titulo: 'VPC e Subnets', tipo: 'video', duracao: '40 min' },
          { id: 'c6', titulo: 'Security Groups e NACLs', tipo: 'video', duracao: '30 min' },
          { id: 'c7', titulo: 'IAM: Gerenciamento de Acesso', tipo: 'video', duracao: '35 min' },
          { id: 'c8', titulo: 'Projeto: Arquitetura Segura', tipo: 'projeto' }
        ]
      },
      {
        id: 'm3',
        titulo: 'Arquiteturas Avançadas',
        descricao: 'Alta disponibilidade e escalabilidade',
        conteudos: [
          { id: 'c9', titulo: 'Load Balancers e Auto Scaling', tipo: 'video', duracao: '40 min' },
          { id: 'c10', titulo: 'RDS e DynamoDB', tipo: 'video', duracao: '35 min' },
          { id: 'c11', titulo: 'Projeto Final: Aplicação Escalável', tipo: 'projeto' }
        ]
      }
    ],
    numeroAvaliacoes: 1678,
    avaliacaoMedia: 4.7,
    numeroAlunos: 8945,
    ultimaAtualizacao: '2025-01-05'
  },
  {
    title: 'UX/UI Design Completo',
    description: 'Crie experiências digitais memoráveis e interfaces intuitivas.',
    category: 'Design',
    duration: '35 horas',
    level: 'iniciante',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
    descricaoDetalhada: 'Transforme-se em um designer de produtos digitais! Este curso abrangente cobre desde pesquisa com usuários até prototipagem de alta fidelidade. Você aprenderá a usar ferramentas profissionais como Figma e desenvolverá um portfólio completo de projetos.',
    objetivos: [
      'Realizar pesquisas e testes com usuários',
      'Criar wireframes e protótipos',
      'Dominar princípios de design visual',
      'Usar Figma profissionalmente',
      'Construir um portfólio de UX/UI'
    ],
    prerequisitos: [
      'Nenhum conhecimento prévio necessário',
      'Criatividade e atenção aos detalhes'
    ],
    totalHoras: 35,
    totalVideos: 72,
    totalExercicios: 38,
    totalProjetos: 6,
    temCertificado: true,
    temTextosComplementares: true,
    temSuporteInstrutor: true,
    temForumDiscussao: true,
    instrutor: {
      nome: 'Juliana Martins',
      bio: 'UX Designer com experiência em produtos digitais premiados',
      especialidade: 'UX Research e Interface Design'
    },
    modulos: [
      {
        id: 'm1',
        titulo: 'Fundamentos de UX',
        descricao: 'Entenda o usuário',
        conteudos: [
          { id: 'c1', titulo: 'O que é UX Design?', tipo: 'video', duracao: '20 min' },
          { id: 'c2', titulo: 'Pesquisa com Usuários', tipo: 'video', duracao: '30 min' },
          { id: 'c3', titulo: 'Personas e Jornadas', tipo: 'video', duracao: '25 min' },
          { id: 'c4', titulo: 'Exercício: Criar Personas', tipo: 'exercicio' }
        ]
      },
      {
        id: 'm2',
        titulo: 'UI Design',
        descricao: 'Crie interfaces bonitas',
        conteudos: [
          { id: 'c5', titulo: 'Princípios de Design Visual', tipo: 'video', duracao: '30 min' },
          { id: 'c6', titulo: 'Tipografia e Cores', tipo: 'video', duracao: '25 min' },
          { id: 'c7', titulo: 'Design Systems', tipo: 'video', duracao: '35 min' },
          { id: 'c8', titulo: 'Projeto: Interface de App', tipo: 'projeto' }
        ]
      },
      {
        id: 'm3',
        titulo: 'Prototipagem e Testes',
        descricao: 'Valide suas ideias',
        conteudos: [
          { id: 'c9', titulo: 'Figma Avançado', tipo: 'video', duracao: '40 min' },
          { id: 'c10', titulo: 'Testes de Usabilidade', tipo: 'video', duracao: '30 min' },
          { id: 'c11', titulo: 'Projeto Final: E-commerce Completo', tipo: 'projeto' }
        ]
      }
    ],
    numeroAvaliacoes: 1923,
    avaliacaoMedia: 4.9,
    numeroAlunos: 10567,
    ultimaAtualizacao: '2025-01-18'
  },
  {
    title: 'DevOps: CI/CD e Automação',
    description: 'Automatize deploys e implemente cultura DevOps.',
    category: 'Tecnologia',
    duration: '40 horas',
    level: 'avançado',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400',
    descricaoDetalhada: 'DevOps é essencial para equipes modernas de desenvolvimento! Este curso ensina as práticas e ferramentas que aceleram o ciclo de desenvolvimento e deployment. Você aprenderá Docker, Kubernetes, Jenkins, GitLab CI/CD e muito mais, com foco em automação e confiabilidade.',
    objetivos: [
      'Implementar pipelines de CI/CD',
      'Containerizar aplicações com Docker',
      'Orquestrar containers com Kubernetes',
      'Automatizar infraestrutura como código',
      'Monitorar aplicações em produção'
    ],
    prerequisitos: [
      'Experiência com desenvolvimento de software',
      'Conhecimento de Git',
      'Familiaridade com Linux',
      'Conceitos básicos de redes'
    ],
    totalHoras: 40,
    totalVideos: 78,
    totalExercicios: 35,
    totalProjetos: 5,
    temCertificado: true,
    temTextosComplementares: true,
    temSuporteInstrutor: true,
    temForumDiscussao: true,
    instrutor: {
      nome: 'Ricardo Almeida',
      bio: 'DevOps Engineer com certificações em Kubernetes e AWS',
      especialidade: 'DevOps, Containers e Automação'
    },
    modulos: [
      {
        id: 'm1',
        titulo: 'Fundamentos DevOps',
        descricao: 'Cultura e práticas',
        conteudos: [
          { id: 'c1', titulo: 'O que é DevOps?', tipo: 'video', duracao: '20 min' },
          { id: 'c2', titulo: 'Git Avançado', tipo: 'video', duracao: '30 min' },
          { id: 'c3', titulo: 'Versionamento Semântico', tipo: 'video', duracao: '15 min' }
        ]
      },
      {
        id: 'm2',
        titulo: 'Containers e Orquestração',
        descricao: 'Docker e Kubernetes',
        conteudos: [
          { id: 'c4', titulo: 'Docker do Zero', tipo: 'video', duracao: '40 min' },
          { id: 'c5', titulo: 'Docker Compose', tipo: 'video', duracao: '30 min' },
          { id: 'c6', titulo: 'Kubernetes Essencial', tipo: 'video', duracao: '50 min' },
          { id: 'c7', titulo: 'Projeto: Microsserviços com K8s', tipo: 'projeto' }
        ]
      },
      {
        id: 'm3',
        titulo: 'CI/CD Pipelines',
        descricao: 'Automação de deploys',
        conteudos: [
          { id: 'c8', titulo: 'Jenkins Pipeline', tipo: 'video', duracao: '35 min' },
          { id: 'c9', titulo: 'GitLab CI/CD', tipo: 'video', duracao: '40 min' },
          { id: 'c10', titulo: 'Projeto Final: Pipeline Completo', tipo: 'projeto' }
        ]
      }
    ],
    numeroAvaliacoes: 1234,
    avaliacaoMedia: 4.8,
    numeroAlunos: 7456,
    ultimaAtualizacao: '2025-01-14'
  },
  {
    title: 'Gestão de Projetos Ágeis com Scrum',
    description: 'Lidere equipes ágeis e entregue valor continuamente.',
    category: 'Soft Skills',
    duration: '20 horas',
    level: 'iniciante',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
    descricaoDetalhada: 'Scrum é o framework ágil mais utilizado no mundo! Este curso prepara você para atuar como Scrum Master ou Product Owner, ensinando todos os eventos, artefatos e papéis do Scrum. Com simulações práticas e cases reais, você estará pronto para liderar transformações ágeis.',
    objetivos: [
      'Compreender os valores e princípios ágeis',
      'Facilitar cerimônias Scrum',
      'Gerenciar backlog de produto',
      'Remover impedimentos da equipe',
      'Preparar-se para certificação PSM I'
    ],
    prerequisitos: [
      'Experiência em trabalho em equipe',
      'Interesse em gestão de projetos'
    ],
    totalHoras: 20,
    totalVideos: 42,
    totalExercicios: 25,
    totalProjetos: 3,
    temCertificado: true,
    temTextosComplementares: true,
    temSuporteInstrutor: false,
    temForumDiscussao: true,
    instrutor: {
      nome: 'Marcos Silva',
      bio: 'Agile Coach e Scrum Master certificado (PSM III)',
      especialidade: 'Metodologias Ágeis e Transformação Digital'
    },
    modulos: [
      {
        id: 'm1',
        titulo: 'Manifesto Ágil',
        descricao: 'Valores e princípios',
        conteudos: [
          { id: 'c1', titulo: 'História do Agile', tipo: 'video', duracao: '15 min' },
          { id: 'c2', titulo: 'Os 4 Valores', tipo: 'video', duracao: '20 min' },
          { id: 'c3', titulo: 'Os 12 Princípios', tipo: 'video', duracao: '25 min' }
        ]
      },
      {
        id: 'm2',
        titulo: 'Framework Scrum',
        descricao: 'Papéis, eventos e artefatos',
        conteudos: [
          { id: 'c4', titulo: 'Papéis do Scrum', tipo: 'video', duracao: '20 min' },
          { id: 'c5', titulo: 'Sprint Planning', tipo: 'video', duracao: '25 min' },
          { id: 'c6', titulo: 'Daily Scrum', tipo: 'video', duracao: '15 min' },
          { id: 'c7', titulo: 'Sprint Review e Retrospective', tipo: 'video', duracao: '30 min' },
          { id: 'c8', titulo: 'Simulação: Sprint Completo', tipo: 'exercicio' }
        ]
      },
      {
        id: 'm3',
        titulo: 'Scrum na Prática',
        descricao: 'Cases e desafios reais',
        conteudos: [
          { id: 'c9', titulo: 'Gerenciamento de Backlog', tipo: 'video', duracao: '25 min' },
          { id: 'c10', titulo: 'Métricas Ágeis', tipo: 'video', duracao: '20 min' },
          { id: 'c11', titulo: 'Projeto: Planejamento de Release', tipo: 'projeto' }
        ]
      }
    ],
    numeroAvaliacoes: 1876,
    avaliacaoMedia: 4.7,
    numeroAlunos: 13245,
    ultimaAtualizacao: '2024-12-28'
  },
  {
    title: 'Blockchain e Criptomoedas',
    description: 'Entenda a tecnologia por trás das criptomoedas e Web3.',
    category: 'IA',
    duration: '30 horas',
    level: 'intermediário',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400',
    descricaoDetalhada: 'Blockchain está revolucionando múltiplas indústrias! Este curso explora desde os fundamentos criptográficos até o desenvolvimento de smart contracts. Você aprenderá sobre Bitcoin, Ethereum, DeFi, NFTs e as oportunidades da Web3.',
    objetivos: [
      'Compreender como blockchain funciona',
      'Desenvolver smart contracts em Solidity',
      'Entender o ecossistema de criptomoedas',
      'Explorar casos de uso de blockchain',
      'Criar sua primeira DApp'
    ],
    prerequisitos: [
      'Programação básica',
      'Conceitos de criptografia',
      'Curiosidade sobre tecnologia'
    ],
    totalHoras: 30,
    totalVideos: 58,
    totalExercicios: 28,
    totalProjetos: 4,
    temCertificado: true,
    temTextosComplementares: true,
    temSuporteInstrutor: true,
    temForumDiscussao: true,
    instrutor: {
      nome: 'Thiago Ribeiro',
      bio: 'Blockchain Developer e entusiasta de Web3',
      especialidade: 'Blockchain, Smart Contracts e DeFi'
    },
    modulos: [
      {
        id: 'm1',
        titulo: 'Fundamentos Blockchain',
        descricao: 'Como tudo funciona',
        conteudos: [
          { id: 'c1', titulo: 'O que é Blockchain?', tipo: 'video', duracao: '25 min' },
          { id: 'c2', titulo: 'Criptografia e Hash', tipo: 'video', duracao: '30 min' },
          { id: 'c3', titulo: 'Consenso e Mineração', tipo: 'video', duracao: '35 min' },
          { id: 'c4', titulo: 'Quiz: Conceitos Fundamentais', tipo: 'quiz' }
        ]
      },
      {
        id: 'm2',
        titulo: 'Ethereum e Smart Contracts',
        descricao: 'Programação blockchain',
        conteudos: [
          { id: 'c5', titulo: 'Introdução ao Ethereum', tipo: 'video', duracao: '25 min' },
          { id: 'c6', titulo: 'Solidity Básico', tipo: 'video', duracao: '40 min' },
          { id: 'c7', titulo: 'Deploy de Contratos', tipo: 'video', duracao: '30 min' },
          { id: 'c8', titulo: 'Projeto: Token ERC-20', tipo: 'projeto' }
        ]
      },
      {
        id: 'm3',
        titulo: 'DeFi e NFTs',
        descricao: 'Aplicações descentralizadas',
        conteudos: [
          { id: 'c9', titulo: 'Finanças Descentralizadas', tipo: 'video', duracao: '30 min' },
          { id: 'c10', titulo: 'NFTs e Metaverso', tipo: 'video', duracao: '25 min' },
          { id: 'c11', titulo: 'Projeto Final: Marketplace NFT', tipo: 'projeto' }
        ]
      }
    ],
    numeroAvaliacoes: 987,
    avaliacaoMedia: 4.6,
    numeroAlunos: 6234,
    ultimaAtualizacao: '2025-01-10'
  },
  {
    title: 'Power BI para Business Intelligence',
    description: 'Crie dashboards interativos e relatórios profissionais.',
    category: 'Dados',
    duration: '28 horas',
    level: 'iniciante',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    descricaoDetalhada: 'Power BI é a ferramenta de BI mais demandada do mercado! Este curso ensina desde a importação de dados até a criação de dashboards interativos e relatórios executivos. Você aprenderá DAX, modelagem de dados e melhores práticas de visualização.',
    objetivos: [
      'Conectar e transformar dados de múltiplas fontes',
      'Criar modelos de dados relacionais',
      'Dominar fórmulas DAX',
      'Desenvolver dashboards interativos',
      'Publicar e compartilhar relatórios'
    ],
    prerequisitos: [
      'Excel intermediário',
      'Conceitos básicos de banco de dados'
    ],
    totalHoras: 28,
    totalVideos: 56,
    totalExercicios: 32,
    totalProjetos: 4,
    temCertificado: true,
    temTextosComplementares: true,
    temSuporteInstrutor: true,
    temForumDiscussao: true,
    instrutor: {
      nome: 'Patricia Lima',
      bio: 'Especialista em Business Intelligence e Data Visualization',
      especialidade: 'Power BI, Tableau e Data Analytics'
    },
    modulos: [
      {
        id: 'm1',
        titulo: 'Introdução ao Power BI',
        descricao: 'Primeiros passos',
        conteudos: [
          { id: 'c1', titulo: 'Interface e Conceitos', tipo: 'video', duracao: '20 min' },
          { id: 'c2', titulo: 'Importação de Dados', tipo: 'video', duracao: '25 min' },
          { id: 'c3', titulo: 'Power Query Editor', tipo: 'video', duracao: '30 min' },
          { id: 'c4', titulo: 'Exercício: Limpeza de Dados', tipo: 'exercicio' }
        ]
      },
      {
        id: 'm2',
        titulo: 'Modelagem e DAX',
        descricao: 'Relacionamentos e cálculos',
        conteudos: [
          { id: 'c5', titulo: 'Modelagem de Dados', tipo: 'video', duracao: '30 min' },
          { id: 'c6', titulo: 'Introdução ao DAX', tipo: 'video', duracao: '35 min' },
          { id: 'c7', titulo: 'Medidas e Colunas Calculadas', tipo: 'video', duracao: '40 min' },
          { id: 'c8', titulo: 'Projeto: Análise de Vendas', tipo: 'projeto' }
        ]
      },
      {
        id: 'm3',
        titulo: 'Visualizações Avançadas',
        descricao: 'Dashboards profissionais',
        conteudos: [
          { id: 'c9', titulo: 'Visuais Personalizados', tipo: 'video', duracao: '30 min' },
          { id: 'c10', titulo: 'Interatividade e Drill-through', tipo: 'video', duracao: '25 min' },
          { id: 'c11', titulo: 'Projeto Final: Dashboard Executivo', tipo: 'projeto' }
        ]
      }
    ],
    numeroAvaliacoes: 2345,
    avaliacaoMedia: 4.9,
    numeroAlunos: 14567,
    ultimaAtualizacao: '2025-01-16'
  },
  {
    title: 'Comunicação e Liderança',
    description: 'Desenvolva habilidades essenciais para liderar equipes.',
    category: 'Soft Skills',
    duration: '18 horas',
    level: 'iniciante',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400',
    descricaoDetalhada: 'Liderança é uma habilidade que pode ser aprendida! Este curso desenvolve suas capacidades de comunicação, influência e gestão de pessoas. Com técnicas comprovadas e exercícios práticos, você se tornará um líder mais eficaz e inspirador.',
    objetivos: [
      'Comunicar-se de forma clara e persuasiva',
      'Desenvolver inteligência emocional',
      'Dar e receber feedback construtivo',
      'Motivar e engajar equipes',
      'Resolver conflitos eficazmente'
    ],
    prerequisitos: [
      'Nenhum conhecimento prévio necessário',
      'Interesse em desenvolvimento pessoal'
    ],
    totalHoras: 18,
    totalVideos: 38,
    totalExercicios: 22,
    totalProjetos: 2,
    temCertificado: true,
    temTextosComplementares: true,
    temSuporteInstrutor: false,
    temForumDiscussao: true,
    instrutor: {
      nome: 'Renata Costa',
      bio: 'Coach Executiva e Palestrante sobre Liderança',
      especialidade: 'Liderança, Comunicação e Desenvolvimento Humano'
    },
    modulos: [
      {
        id: 'm1',
        titulo: 'Fundamentos da Comunicação',
        descricao: 'Comunique-se melhor',
        conteudos: [
          { id: 'c1', titulo: 'Comunicação Verbal e Não-Verbal', tipo: 'video', duracao: '20 min' },
          { id: 'c2', titulo: 'Escuta Ativa', tipo: 'video', duracao: '18 min' },
          { id: 'c3', titulo: 'Apresentações Eficazes', tipo: 'video', duracao: '25 min' },
          { id: 'c4', titulo: 'Exercício: Pitch Pessoal', tipo: 'exercicio' }
        ]
      },
      {
        id: 'm2',
        titulo: 'Inteligência Emocional',
        descricao: 'Gerencie emoções',
        conteudos: [
          { id: 'c5', titulo: 'Autoconhecimento', tipo: 'video', duracao: '22 min' },
          { id: 'c6', titulo: 'Empatia e Relacionamentos', tipo: 'video', duracao: '20 min' },
          { id: 'c7', titulo: 'Gestão de Conflitos', tipo: 'video', duracao: '25 min' },
          { id: 'c8', titulo: 'Exercício: Análise de Caso', tipo: 'exercicio' }
        ]
      },
      {
        id: 'm3',
        titulo: 'Liderança na Prática',
        descricao: 'Lidere com propósito',
        conteudos: [
          { id: 'c9', titulo: 'Estilos de Liderança', tipo: 'video', duracao: '20 min' },
          { id: 'c10', titulo: 'Feedback e Desenvolvimento', tipo: 'video', duracao: '22 min' },
          { id: 'c11', titulo: 'Projeto: Plano de Desenvolvimento', tipo: 'projeto' }
        ]
      }
    ],
    numeroAvaliacoes: 2567,
    avaliacaoMedia: 4.8,
    numeroAlunos: 15678,
    ultimaAtualizacao: '2024-12-15'
  },
  {
    title: 'Cibersegurança Essencial',
    description: 'Proteja sistemas e dados contra ameaças digitais.',
    category: 'Tecnologia',
    duration: '35 horas',
    level: 'intermediário',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
    descricaoDetalhada: 'Segurança da informação nunca foi tão crítica! Este curso abrangente ensina os fundamentos de cibersegurança, desde conceitos básicos até técnicas avançadas de proteção. Você aprenderá sobre vulnerabilidades, ataques comuns, criptografia e como implementar defesas eficazes.',
    objetivos: [
      'Identificar vulnerabilidades em sistemas',
      'Implementar controles de segurança',
      'Compreender ataques e contramedidas',
      'Aplicar princípios de criptografia',
      'Desenvolver consciência de segurança'
    ],
    prerequisitos: [
      'Conhecimentos básicos de redes',
      'Familiaridade com sistemas operacionais',
      'Conceitos de programação'
    ],
    totalHoras: 35,
    totalVideos: 68,
    totalExercicios: 40,
    totalProjetos: 5,
    temCertificado: true,
    temTextosComplementares: true,
    temSuporteInstrutor: true,
    temForumDiscussao: true,
    instrutor: {
      nome: 'Eduardo Santos',
      bio: 'Especialista em Segurança da Informação e Ethical Hacker certificado',
      especialidade: 'Cibersegurança, Pentesting e Forense Digital'
    },
    modulos: [
      {
        id: 'm1',
        titulo: 'Fundamentos de Segurança',
        descricao: 'Conceitos essenciais',
        conteudos: [
          { id: 'c1', titulo: 'CIA Triad', tipo: 'video', duracao: '20 min' },
          { id: 'c2', titulo: 'Tipos de Ameaças', tipo: 'video', duracao: '25 min' },
          { id: 'c3', titulo: 'Gestão de Riscos', tipo: 'video', duracao: '30 min' },
          { id: 'c4', titulo: 'Quiz: Conceitos Fundamentais', tipo: 'quiz' }
        ]
      },
      {
        id: 'm2',
        titulo: 'Segurança de Redes',
        descricao: 'Proteja sua infraestrutura',
        conteudos: [
          { id: 'c5', titulo: 'Firewalls e IDS/IPS', tipo: 'video', duracao: '35 min' },
          { id: 'c6', titulo: 'VPNs e Túneis Seguros', tipo: 'video', duracao: '30 min' },
          { id: 'c7', titulo: 'Segurança Wi-Fi', tipo: 'video', duracao: '25 min' },
          { id: 'c8', titulo: 'Projeto: Configuração de Firewall', tipo: 'projeto' }
        ]
      },
      {
        id: 'm3',
        titulo: 'Segurança de Aplicações',
        descricao: 'OWASP Top 10 e mais',
        conteudos: [
          { id: 'c9', titulo: 'Vulnerabilidades Web', tipo: 'video', duracao: '40 min' },
          { id: 'c10', titulo: 'Secure Coding', tipo: 'video', duracao: '35 min' },
          { id: 'c11', titulo: 'Projeto Final: Auditoria de Segurança', tipo: 'projeto' }
        ]
      }
    ],
    numeroAvaliacoes: 1456,
    avaliacaoMedia: 4.7,
    numeroAlunos: 7890,
    ultimaAtualizacao: '2025-01-11'
  },
  {
    title: 'Excel Avançado para Negócios',
    description: 'Domine fórmulas, tabelas dinâmicas e automação.',
    category: 'Dados',
    duration: '22 horas',
    level: 'intermediário',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    descricaoDetalhada: 'Excel é a ferramenta mais utilizada no mundo corporativo! Este curso avançado ensina técnicas profissionais de análise de dados, automação com macros e VBA, e criação de dashboards dinâmicos. Aumente sua produtividade e torne-se indispensável em sua organização.',
    objetivos: [
      'Dominar fórmulas avançadas e matriciais',
      'Criar tabelas dinâmicas complexas',
      'Automatizar tarefas com macros e VBA',
      'Desenvolver dashboards interativos',
      'Realizar análises what-if e cenários'
    ],
    prerequisitos: [
      'Excel básico e intermediário',
      'Conhecimento de funções básicas'
    ],
    totalHoras: 22,
    totalVideos: 48,
    totalExercicios: 55,
    totalProjetos: 3,
    temCertificado: true,
    temTextosComplementares: true,
    temSuporteInstrutor: true,
    temForumDiscussao: true,
    instrutor: {
      nome: 'Gustavo Oliveira',
      bio: 'Especialista em Excel e Automação de Processos',
      especialidade: 'Excel Avançado, VBA e Business Analytics'
    },
    modulos: [
      {
        id: 'm1',
        titulo: 'Fórmulas Avançadas',
        descricao: 'Além do PROCV',
        conteudos: [
          { id: 'c1', titulo: 'ÍNDICE e CORRESP', tipo: 'video', duracao: '25 min' },
          { id: 'c2', titulo: 'Fórmulas Matriciais', tipo: 'video', duracao: '30 min' },
          { id: 'c3', titulo: 'SOMASES, CONT.SES e Cia', tipo: 'video', duracao: '20 min' },
          { id: 'c4', titulo: '30 Exercícios Práticos', tipo: 'exercicio' }
        ]
      },
      {
        id: 'm2',
        titulo: 'Tabelas Dinâmicas Avançadas',
        descricao: 'Análise de dados poderosa',
        conteudos: [
          { id: 'c5', titulo: 'Tabelas Dinâmicas Complexas', tipo: 'video', duracao: '30 min' },
          { id: 'c6', titulo: 'Campos Calculados', tipo: 'video', duracao: '25 min' },
          { id: 'c7', titulo: 'Gráficos Dinâmicos', tipo: 'video', duracao: '20 min' },
          { id: 'c8', titulo: 'Projeto: Dashboard de Vendas', tipo: 'projeto' }
        ]
      },
      {
        id: 'm3',
        titulo: 'Macros e VBA',
        descricao: 'Automatize tudo',
        conteudos: [
          { id: 'c9', titulo: 'Gravação de Macros', tipo: 'video', duracao: '20 min' },
          { id: 'c10', titulo: 'Introdução ao VBA', tipo: 'video', duracao: '35 min' },
          { id: 'c11', titulo: 'Projeto Final: Sistema Automatizado', tipo: 'projeto' }
        ]
      }
    ],
    numeroAvaliacoes: 3456,
    avaliacaoMedia: 4.9,
    numeroAlunos: 18234,
    ultimaAtualizacao: '2025-01-13'
  },
  {
    title: 'Marketing Digital e Growth Hacking',
    description: 'Estratégias para crescimento acelerado de negócios digitais.',
    category: 'Soft Skills',
    duration: '32 horas',
    level: 'intermediário',
    imageUrl: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=400',
    descricaoDetalhada: 'Marketing digital é essencial para qualquer negócio moderno! Este curso ensina desde SEO e Google Ads até estratégias avançadas de growth hacking. Você aprenderá a criar funis de conversão, otimizar campanhas e acelerar o crescimento de produtos digitais.',
    objetivos: [
      'Criar estratégias de marketing digital',
      'Dominar Google Ads e Facebook Ads',
      'Implementar técnicas de SEO',
      'Construir funis de conversão',
      'Aplicar growth hacking para crescimento rápido'
    ],
    prerequisitos: [
      'Conhecimentos básicos de marketing',
      'Familiaridade com redes sociais',
      'Interesse em negócios digitais'
    ],
    totalHoras: 32,
    totalVideos: 64,
    totalExercicios: 35,
    totalProjetos: 5,
    temCertificado: true,
    temTextosComplementares: true,
    temSuporteInstrutor: true,
    temForumDiscussao: true,
    instrutor: {
      nome: 'Camila Rodrigues',
      bio: 'Growth Hacker e Especialista em Marketing Digital',
      especialidade: 'Growth Marketing, Performance e Analytics'
    },
    modulos: [
      {
        id: 'm1',
        titulo: 'Fundamentos de Marketing Digital',
        descricao: 'Base sólida',
        conteudos: [
          { id: 'c1', titulo: 'Jornada do Cliente', tipo: 'video', duracao: '25 min' },
          { id: 'c2', titulo: 'Funis de Conversão', tipo: 'video', duracao: '30 min' },
          { id: 'c3', titulo: 'Métricas e KPIs', tipo: 'video', duracao: '20 min' },
          { id: 'c4', titulo: 'Exercício: Análise de Funil', tipo: 'exercicio' }
        ]
      },
      {
        id: 'm2',
        titulo: 'Tráfego Pago',
        descricao: 'Google e Facebook Ads',
        conteudos: [
          { id: 'c5', titulo: 'Google Ads do Zero', tipo: 'video', duracao: '40 min' },
          { id: 'c6', titulo: 'Facebook e Instagram Ads', tipo: 'video', duracao: '35 min' },
          { id: 'c7', titulo: 'Otimização de Campanhas', tipo: 'video', duracao: '30 min' },
          { id: 'c8', titulo: 'Projeto: Campanha Completa', tipo: 'projeto' }
        ]
      },
      {
        id: 'm3',
        titulo: 'Growth Hacking',
        descricao: 'Crescimento acelerado',
        conteudos: [
          { id: 'c9', titulo: 'Mindset de Growth', tipo: 'video', duracao: '25 min' },
          { id: 'c10', titulo: 'Experimentos e Testes A/B', tipo: 'video', duracao: '30 min' },
          { id: 'c11', titulo: 'Projeto Final: Estratégia de Growth', tipo: 'projeto' }
        ]
      }
    ],
    numeroAvaliacoes: 1789,
    avaliacaoMedia: 4.8,
    numeroAlunos: 9876,
    ultimaAtualizacao: '2025-01-17'
  }
];

export const initializeTrilhasDetalhadas = async (): Promise<void> => {
  try {
    const trilhasRef = collection(db, 'trilhas');
    
    // Busca todas as trilhas existentes
    const snapshot = await getDocs(trilhasRef);
    const trilhasExistentes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log(`📊 Encontradas ${trilhasExistentes.length} trilhas no Firebase`);

    let updated = 0;
    let skipped = 0;

    // Para cada trilha detalhada, tenta encontrar uma trilha existente com o mesmo título
    for (const trilhaDetalhada of TRILHAS_DETALHADAS) {
      const trilhaExistente = trilhasExistentes.find(
        t => t.title === trilhaDetalhada.title
      );

      if (trilhaExistente) {
        // Atualiza a trilha existente com os detalhes
        const docRef = doc(db, 'trilhas', trilhaExistente.id);
        await updateDoc(docRef, {
          ...trilhaDetalhada,
          updatedAt: new Date(),
        });
        console.log(`✅ Trilha "${trilhaDetalhada.title}" atualizada com detalhes`);
        updated++;
      } else {
        console.log(`⚠️ Trilha "${trilhaDetalhada.title}" não encontrada, pulando...`);
        skipped++;
      }
    }
    
    console.log(`\n📈 Resumo:`);
    console.log(`   ✅ ${updated} trilhas atualizadas com detalhes`);
    console.log(`   ⚠️ ${skipped} trilhas não encontradas`);
    console.log(`\n🎉 Processo concluído!`);
  } catch (error) {
    console.error('❌ Erro ao inicializar trilhas detalhadas:', error);
    throw error;
  }
};

