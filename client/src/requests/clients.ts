import axios from 'axios';
import type { IClient } from '~/interfaces/IClient';

export function create(client: Partial<IClient>) {
  return axios.post<IClient>('/api/clients/create', client);
}

export function update(client: Partial<IClient>) {
  return axios.post<IClient>('/api/clients/update', client);
}

export function list(page: number, limit: number, searchForm: Partial<IClient>) {
  return axios.post<IClient[]>(`/api/clients?page=${page}&limit=${limit}`, searchForm);
}

export function detail(id: string) {
  return axios.get<IClient>(`/api/clients/detail/${id}`);
}

export function _delete(id: string) {
  return axios.get(`/api/clients/delete/${id}`);
}
