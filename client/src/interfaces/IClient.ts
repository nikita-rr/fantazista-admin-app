import type { IUser } from './IUser';

export interface IClient {
  id: string;
  f: string;
  i: string;
  o: string;
  tax_status: string;
  inn: string;
  ogrn: string;
  created_at?: string;
  deleted_at?: string;
  creatorId: string;
  creator?: IUser;
}
