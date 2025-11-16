export interface ModuloConteudo {
  id: string;
  titulo: string;
  tipo: 'video' | 'texto' | 'exercicio' | 'quiz' | 'projeto';
  duracao?: string; // Para vídeos (ex: "15 min")
  concluido?: boolean;
}

export interface Modulo {
  id: string;
  titulo: string;
  descricao: string;
  conteudos: ModuloConteudo[];
}

export interface TrilhaDetalhada {
  id: string;
  // Campos básicos (já existentes)
  title: string;
  description: string;
  category: string;
  duration: string;
  level: 'iniciante' | 'intermediário' | 'avançado';
  imageUrl: string;
  
  // Campos detalhados (novos)
  descricaoDetalhada: string;
  objetivos: string[];
  prerequisitos: string[];
  
  // Estatísticas
  totalHoras: number;
  totalVideos: number;
  totalExercicios: number;
  totalProjetos: number;
  
  // Recursos
  temCertificado: boolean;
  temTextosComplementares: boolean;
  temSuporteInstrutor: boolean;
  temForumDiscussao: boolean;
  
  // Informações do instrutor
  instrutor: {
    nome: string;
    bio: string;
    especialidade: string;
  };
  
  // Conteúdo programático
  modulos: Modulo[];
  
  // Metadados
  numeroAvaliacoes: number;
  avaliacaoMedia: number;
  numeroAlunos: number;
  ultimaAtualizacao: string;
}

