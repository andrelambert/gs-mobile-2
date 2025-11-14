export interface UserProfile {
  id: string; // same as Firebase Auth UID
  name: string;
  birthday: string; // ISO date string (YYYY-MM-DD)
  bio: string;
  zipcode: string;
  address: string;
}

export type UpdateUserProfileRequest = Partial<Omit<UserProfile, 'id'>>;


