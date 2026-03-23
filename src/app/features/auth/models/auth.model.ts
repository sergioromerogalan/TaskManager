export interface Credentials {
  username: string;
  password: string;
}

export interface SessionUser {
  id: number;
  name: string;
  email: string;
  token: string;
}
