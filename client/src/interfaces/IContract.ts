import type { IClient } from './IClient';
import type { IUser } from './IUser';

export interface IContract {
  id: string;
  creator?: IUser;
  creatorId: string;
  created_at: string;
  deleted_at?: string;
  client?: IClient;
  clientId: string;
  number: string;
  date: string;
  client_brand?: string;
  summ: number;
  legal_entity?: string;
  files: ContractFile[];
}

export interface IContractFilter {
  creatorId?: string;
  clientsIds?: string[];
  number?: string;
  date_start?: string;
  date_end?: string;
  client_brand?: string;
  summ_start?: number;
  summ_end?: number;
  legal_entity?: string;
}

export interface IContractForm extends IContract {
  _files: any[];
}

export interface ContractFile {
  id: string;
  created_at: string;
  deleted_at: string;
  contract: string;
  contractId: string;
  target_path: string;
  size: number;
  extension: string;
  original_name: string;
  mimetype: string;
}
