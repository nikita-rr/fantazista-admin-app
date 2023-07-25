import axios from 'axios';
// @ts-ignore
axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE || '/';
axios.defaults.withCredentials = true