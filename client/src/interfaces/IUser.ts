export interface IUser {
  id: string;
  created_at: string;
  login: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
}
