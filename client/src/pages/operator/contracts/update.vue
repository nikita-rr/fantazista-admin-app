<script setup lang="ts">
import Form from '~/components/operator/contracts/ContractsForm.vue';
import FormSkeleton from '~/components/operator/contracts/ContractsFormSkeleton.vue';
import { ArrowLeft, Edit } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import type { IContract } from '~/interfaces/IContract';
import * as api from '~/requests/contracts';
import { usePrintServerErrors } from '~/composables/usePrintServerErrors';
import { useProgress } from '~/composables/useProgress';
import type { IServerError } from '~/interfaces/IServerError';
import { EventHub, Events } from '~/utils/event-hub';
import { ElMessage } from 'element-plus';

const loadingTimeout = 400;
const router = useRouter();
const route = useRoute();
const item = ref<IContract>();
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

async function onSubmit(form: Partial<IContract>) {
  try {
    loading.value = true;
    progress.emitStart();
    await api.update(form);
    progress.emitEnd(() => {
      ElMessage({
        type: 'success',
        message: 'Запись успешно добавлена',
      });
      router.push('/contracts');
    });
  } catch (error) {
    progress.emitEnd(() => {
      printServerErrors.print(error as IServerError);
      loading.value = false;
    }, "exception");
    console.error(error);
  }
}
</script>

<template>
  <div class="contracts-list">
    <div class="page-sub-title">
      <div class="container">
        <div class="page-sub-title__inner">
          <h2 class="page-sub-title__title">
            <el-icon size="18"><Edit /></el-icon> Редактирование договора
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
