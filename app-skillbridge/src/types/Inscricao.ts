export interface Inscricao {
  id: string;
  userId: string;
  trilhaId: string;
  createdAt: Date;
}

export interface CreateInscricaoRequest {
  userId: string;
  trilhaId: string;
}


