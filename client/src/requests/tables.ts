import axios from 'axios';
import type { ITable, ITableFilter } from '~/interfaces/ITable';

export function create(table: Partial<ITable>) {
  return axios.post<ITable>('/api/tables/create', table);
}

export function update(table: Partial<ITable>) {
  return axios.post<ITable>('/api/tables/update', table);
}

export function list(page: number, limit: number, searchForm: ITableFilter) {
  return axios.post<ITable[]>(`/api/tables?page=${page}&limit=${limit}`, searchForm);
}

export function detail(id: string) {
  return axios.get<ITable>(`/api/tables/detail/${id}`);
}

export function _delete(id: string) {
  return axios.get(`/api/tables/delete/${id}`);
}
