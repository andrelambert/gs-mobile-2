export interface Trilha {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: 'iniciante' | 'intermediário' | 'avançado';
  imageUrl: string;
}

export type CreateTrilhaRequest = Omit<Trilha, 'id'>;


