import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { CreateInscricaoRequest, Inscricao } from '../types/Inscricao';

const INSCRICOES_COLLECTION = 'inscricoes';

const mapInscricao = (snapshot: any): Inscricao => {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    userId: data.userId,
    trilhaId: data.trilhaId,
    createdAt: data.createdAt?.toDate?.() ?? new Date(),
  };
};

export const getInscricoesByUser = async (
  userId: string,
): Promise<Inscricao[]> => {
  const q = query(
    collection(db, INSCRICOES_COLLECTION),
    where('userId', '==', userId),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapInscricao);
};

export const createInscricao = async (
  payload: CreateInscricaoRequest,
): Promise<string> => {
  const docRef = await addDoc(collection(db, INSCRICOES_COLLECTION), {
    userId: payload.userId,
    trilhaId: payload.trilhaId,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const deleteInscricao = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, INSCRICOES_COLLECTION, id));
};


