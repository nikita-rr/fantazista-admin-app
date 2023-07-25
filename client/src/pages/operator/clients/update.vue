<script setup lang="ts">
import Form from '~/components/operator/clients/ClientsForm.vue';
import FormSkeleton from '~/components/operator/clients/ClientsFormSkeleton.vue';
import { ArrowLeft, Edit } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import type { IClient } from '~/interfaces/IClient';
import * as api from '~/requests/clients';
import { usePrintServerErrors } from '~/composables/usePrintServerErrors';
import { useProgress } from '~/composables/useProgress';
import type { IServerError } from '~/interfaces/IServerError';
import { ElMessage } from 'element-plus';

const loadingTimeout = 400;
const router = useRouter();
const route = useRoute();
const item = ref<IClient>();
const loading = ref(true);

onBeforeMount(async () => {
  let { data } = await api.detail(route.params.id as string);
  setTimeout(() => {
    item.value = data;
    loading.value = false;
  }, loadingTimeout);
});

const progress = useProgress();
const printServerErrors = usePrintServerErrors();

async function onSubmit(form: Partial<IClient>) {
  try {
    loading.value = true;
    progress.emitStart();
    await api.update(form);
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
            <el-icon size="18"><Edit /></el-icon> Редактирование клиента
          </h2>
          <div class="page-sub-title__actions">
            <el-button @click="router.go(-1)" :icon="ArrowLeft">Назад</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <Form :form-data="item" @submit="onSubmit" v-if="item" :loading="loading" />
      <FormSkeleton v-else />
    </div>
  </div>
</template>
