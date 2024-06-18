export interface PostUserSignInInfo {
  username: string;
  password: string;
}

export interface UserSignInInfoWithToken {
  access_token: string;
  userInfo: {
    id: number;
    name: string;
    username: string;
    email: string;
    profile: string;
    is_admin: boolean;
    registration: string;
  };
}

export interface UserSignInInfo {
  id: number;
  name: string;
  username: string;
  email: string;
  profile: string;
  is_admin: boolean;
  registration: string;
}
