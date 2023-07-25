<script setup lang="ts">
import { ArrowLeft, DocumentAdd } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useProgress } from '~/composables/useProgress';
import { usePrintServerErrors } from '~/composables/usePrintServerErrors';
import type { IClient } from '~/interfaces/IClient';
import Form from '~/components/operator/clients/ClientsForm.vue';
import type { IServerError } from '~/interfaces/IServerError';
import * as api from '~/requests/clients';
import { ref } from 'vue';

const router = useRouter();
const progress = useProgress();
const printServerErrors = usePrintServerErrors();
const loading = ref(false);

async function onSubmit(form: Partial<IClient>) {
  try {
    loading.value = true;
    progress.emitStart();
    await api.create(form);
    progress.emitEnd(() => {
      ElMessage({
        type: 'success',
        message: 'Запись успешно добавлена',
      });
      router.push('/');
    });
  } catch (error) {
    progress.emitEnd(() => {
      printServerErrors.print(error as IServerError);
      loading.value = false;
    }, "exception")
    console.error(error);
  }
}
</script>

<template>
  <div class="clients-list">
    <div class="page-sub-title">
      <div class="container">
        <div class="page-sub-title__inner">
          <h2 class="page-sub-title__title">
            <el-icon size="18"><DocumentAdd /></el-icon> Добавление клиента
          </h2>
          <div class="page-sub-title__actions">
            <el-button @click="router.go(-1)" :icon="ArrowLeft">Назад</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <Form @submit="onSubmit" :loading="loading" />
    </div>
  </div>
</template>
