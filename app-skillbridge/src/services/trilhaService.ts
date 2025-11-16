import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { CreateTrilhaRequest, Trilha } from '../types/Trilha';
import { TrilhaDetalhada } from '../types/TrilhaDetalhada';

const TRILHAS_COLLECTION = 'trilhas';

export const getAllTrilhas = async (): Promise<Trilha[]> => {
  const q = query(collection(db, TRILHAS_COLLECTION), orderBy('title', 'asc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(
    (doc): Trilha => ({
      id: doc.id,
      title: doc.data().title ?? '',
      description: doc.data().description ?? '',
      category: doc.data().category ?? '',
      duration: doc.data().duration ?? '',
      level: doc.data().level ?? 'iniciante',
      imageUrl: doc.data().imageUrl ?? '',
    }),
  );
};

export const seedTrilha = async (trilha: CreateTrilhaRequest) => {
  await addDoc(collection(db, TRILHAS_COLLECTION), trilha);
};

export const getTrilhaDetalhada = async (trilhaId: string): Promise<TrilhaDetalhada | null> => {
  try {
    const trilhaRef = doc(db, TRILHAS_COLLECTION, trilhaId);
    const trilhaDoc = await getDoc(trilhaRef);
    
    if (!trilhaDoc.exists()) {
      return null;
    }
    
    const data = trilhaDoc.data();
    return {
      id: trilhaDoc.id,
      title: data.title ?? '',
      description: data.description ?? '',
      category: data.category ?? '',
      duration: data.duration ?? '',
      level: data.level ?? 'iniciante',
      imageUrl: data.imageUrl ?? '',
      descricaoDetalhada: data.descricaoDetalhada ?? '',
      objetivos: data.objetivos ?? [],
      prerequisitos: data.prerequisitos ?? [],
      totalHoras: data.totalHoras ?? 0,
      totalVideos: data.totalVideos ?? 0,
      totalExercicios: data.totalExercicios ?? 0,
      totalProjetos: data.totalProjetos ?? 0,
      temCertificado: data.temCertificado ?? false,
      temTextosComplementares: data.temTextosComplementares ?? false,
      temSuporteInstrutor: data.temSuporteInstrutor ?? false,
      temForumDiscussao: data.temForumDiscussao ?? false,
      instrutor: data.instrutor ?? { nome: '', bio: '', especialidade: '' },
      modulos: data.modulos ?? [],
      numeroAvaliacoes: data.numeroAvaliacoes ?? 0,
      avaliacaoMedia: data.avaliacaoMedia ?? 0,
      numeroAlunos: data.numeroAlunos ?? 0,
      ultimaAtualizacao: data.ultimaAtualizacao ?? '',
    } as TrilhaDetalhada;
  } catch (error) {
    console.error('Erro ao buscar trilha detalhada:', error);
    throw error;
  }
};


