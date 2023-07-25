import type { RouteLocationNormalized } from 'vue-router';
import { useUserStore } from '../store/user';
import { UserRole } from '~/interfaces/IUser';

export function adminRoutesGuard(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  const userStore = useUserStore();
  if (!userStore.userIs(UserRole.ADMIN)) {
    return { path: '/auth/login' };
  }
}

export function operatorRoutesGuard() {
  const userStore = useUserStore();
  if (!userStore.isAuthorized()) {
    return { name: 'login' };
  }
}
