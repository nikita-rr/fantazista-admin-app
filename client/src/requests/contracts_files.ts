import axios from 'axios';

export function _delete(id: string) {
  return axios.get(`/api/contracts/files/delete/${id}`);
}

export function download(id: string) {
  return axios({
    method: 'get',
    url: `/api/contracts/files/download/${id}`,
    responseType: 'blob'
  });
}
