import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { UpdateUserProfileRequest, UserProfile } from '../types/UserProfile';

const USERS_COLLECTION = 'users';

export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  const ref = doc(db, USERS_COLLECTION, userId);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return {
      id: userId,
      name: '',
      birthday: '',
      bio: '',
      zipcode: '',
      address: '',
    };
  }

  const data = snapshot.data();
  return {
    id: snapshot.id,
    name: data.name ?? '',
    birthday: data.birthday ?? '',
    bio: data.bio ?? '',
    zipcode: data.zipcode ?? '',
    address: data.address ?? '',
  };
};

export const updateUserProfile = async (
  userId: string,
  updates: UpdateUserProfileRequest,
): Promise<void> => {
  const ref = doc(db, USERS_COLLECTION, userId);

  try {
    await updateDoc(ref, updates);
  } catch (error: any) {
    // If document does not exist yet, create it
    if (error?.code === 'not-found') {
      await setDoc(ref, updates);
      return;
    }
    throw error;
  }
};


