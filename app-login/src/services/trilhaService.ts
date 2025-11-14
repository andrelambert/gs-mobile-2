import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { CreateTrilhaRequest, Trilha } from '../types/Trilha';

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


