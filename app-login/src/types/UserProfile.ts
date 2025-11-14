export interface UserProfile {
  id: string; // same as Firebase Auth UID
  name: string;
  lastName: string;
  birthday: string; // formato DD/MM/AAAA
  bio: string;
  zipcode: string; // formato 00000-000
  street: string;
  number: string;
  complement: string;
  state: string;
  city: string;
}

export type UpdateUserProfileRequest = Partial<Omit<UserProfile, 'id'>>;


