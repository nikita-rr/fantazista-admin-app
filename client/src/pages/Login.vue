<script setup lang="ts">
import Logo from '~/components/Logo.vue';
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue';
import { Key } from '@element-plus/icons-vue';
import { useUserStore } from '~/store/user';
import { useRouter } from 'vue-router';
import { UserRole } from '~/interfaces/IUser';

const router = useRouter()
const userStore = useUserStore();

const form = reactive({
  login: '',
  password: '',
});

const loading = ref(false)

async function login() {
  try {
    loading.value = true
    await userStore.makeLoginRequest(form.login, form.password);
    if(userStore.userIs(UserRole.OPERATOR)) {
      router.push('/')
    } else if (userStore.userIs(UserRole.ADMIN)) {
      router.push('/admin')
    }
  } catch (error: any) {
    ElMessage.warning(error.response.data)
    loading.value = false
  }
}

</script>

<template>
  <div class="login-page">
    <Logo class="login-page__logo" />
    <el-card>
      <template #header>
        <div class="login-page__form-title">
          <h3>Кабинет администратора</h3>
          <p>Вход в систему</p>
        </div>
      </template>
      <el-form label-position="top">
        <el-form-item label="Логин">
          <el-input v-model="form.login" />
        </el-form-item>
        <el-form-item label="Пароль">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-button type="primary" size="large" :loading="loading" :icon="Key" @click="login">
          Войти</el-button
        >
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss">
.login-page {
  max-width: 500px;
  margin: 0 auto;
  padding-top: 50px;
  &__logo {
    width: 60px;
    margin-bottom: 20px;
  }
}
</style>
