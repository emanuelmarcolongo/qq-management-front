export interface Profile {
  id: number;
  name: string;
  description: string;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateProfileData {
  name: string;
  description?: string;
}
