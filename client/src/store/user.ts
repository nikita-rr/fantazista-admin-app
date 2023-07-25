import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import type { IUser, UserRole } from '~/interfaces/IUser';
import type { IServerError } from '~/interfaces/IServerError';

export const useUserStore = defineStore('userStore', () => {
  const storedUserString = localStorage.getItem('user');
  const storedUser = storedUserString ? JSON.parse(storedUserString) : null;

  const user = ref<IUser | null>(storedUser);

  async function makeLoginRequest(login: string, password: string) {
    const { data } = await axios.post<IUser>('/api/login', { login, password });
    setUser(data);
  }

  async function makeLogoutRequest() {
    await axios.get('/api/logout');
    clearUser();
  }

  async function makeUserDataRequest() {
    try {
      const { data } = await axios.get<IUser>('/api/user-data');
      setUser(data);
    } catch (error) {
      const _error = error as IServerError;
      clearUser();
      throw _error.response?.data?.statusCode;
    }
  }

  function setUser(userData: IUser) {
    user.value = userData;
    localStorage.setItem('user', JSON.stringify(userData));
  }

  function clearUser() {
    user.value = null;
    localStorage.removeItem('user');
  }

  function getUser() {
    return user;
  }

  function isAuthorized() {
    return !!user.value;
  }

  function userIs(role: UserRole) {
    return user.value?.role === role;
  }

  return {
    getUser,
    makeLoginRequest,
    makeLogoutRequest,
    isAuthorized,
    makeUserDataRequest,
    userIs,
  };
});
