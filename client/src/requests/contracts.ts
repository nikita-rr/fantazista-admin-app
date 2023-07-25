import axios from 'axios';
import type { IContract, IContractForm } from '~/interfaces/IContract';

export function create(form: Partial<IContractForm>) {
  const formData = new FormData();
  formData.append('number', form.number || '');
  formData.append('date', form.date ? new Date(form.date).toISOString() : '');
  formData.append('summ', form.summ?.toString() || '');
  formData.append('legal_entity', form.legal_entity || '');
  formData.append('client_brand', form.client_brand || '');
  formData.append('clientId', form.clientId || '');

  if (form._files) {
    for (const file of form._files) {
      formData.append('_files', file);
    }
  }

  return axios<IContract>({
    url: '/api/contracts/create',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function update(form: Partial<IContractForm>) {
  const formData = new FormData();
  formData.append('id', form.id || '');
  formData.append('number', form.number || '');
  formData.append('date', form.date ? new Date(form.date).toISOString() : '');
  formData.append('summ', form.summ?.toString() || '');
  formData.append('legal_entity', form.legal_entity || '');
  formData.append('client_brand', form.client_brand || '');
  formData.append('clientId', form.clientId || '');

  if (form._files) {
    for (const file of form._files) {
      formData.append('_files', file);
    }
  }

  return axios<IContract>({
    url: '/api/contracts/update',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function list(page: number, limit: number, searchForm: Partial<IContract>) {
  return axios.post<IContract[]>(
    `/api/contracts?page=${page}&limit=${limit}`,
    searchForm,
  );
}

export function detail(id: string) {
  return axios.get<IContract>(`/api/contracts/detail/${id}`);
}

export function _delete(id: string) {
  return axios.get(`/api/contracts/delete/${id}`);
}