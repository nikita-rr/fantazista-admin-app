import type { IContract } from './IContract';
import type { IUser } from './IUser';

export interface ITable {
  id: string;
  type: string;
  lat: string;
  lon: string;
  contractId: string;
  contract?: IContract;
  created_at?: string;
  deleted_at?: string;
  creatorId: string;
  creator?: IUser;
}

export interface ITableFilter {
  type?: string;
  lat?: string;
  lon?: string;
  contractsIds?: string;
}
