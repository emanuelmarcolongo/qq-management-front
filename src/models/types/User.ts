export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  registration: string;
  password: string;
  profile_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface UserWithProfile {
  id: number;
  name: string;
  username: string;
  email: string;
  registration: string;
  password: string;
  profile_id: number;
  created_at: Date;
  updated_at: Date;
  profile: {
    id: number;
    name: string;
  };
}

export interface CreateUserData {
  name: string;
  username: string;
  email: string;
  registration: string;
  profile_id: number;
}

export interface MappedUser {
  id: number;
  name: string;
  username: string;
  email: string;
  registration: string;
  profile: string; // Nome do perfil
  created_at: Date;
}
