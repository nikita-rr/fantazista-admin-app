<script setup lang="ts">
import { ArrowLeft, Document, Edit } from '@element-plus/icons-vue';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatDate } from '~/utils/date';
import * as api from '~/requests/clients';
import type { IClient } from '~/interfaces/IClient';

const loadingTimeout = 400;
const router = useRouter();
const route = useRoute();
const item = ref<IClient>();
const loading = ref(true);

onBeforeMount(async () => {
  let { data } = await api.detail(route.params.id as string);
  item.value = data;
  setTimeout(() => (loading.value = false), loadingTimeout);
});
</script>

<template>
  <div class="detail">
    <div class="page-sub-title">
      <div class="container">
        <div class="page-sub-title__inner">
          <h2 class="page-sub-title__title">
            <el-icon size="18"><Document /></el-icon> Информация о клиенте
          </h2>
          <div class="page-sub-title__actions">
            <el-button-group>
              <el-button
                @click="router.push(`/clients/update/${item?.id}`)"
                :icon="Edit"
                type="warning"
                >Редактировать</el-button
              >
              <el-button @click="router.go(-1)" :icon="ArrowLeft">Назад</el-button>
            </el-button-group>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div v-if="loading">
        <el-card>
          <template #header>
            <el-skeleton animated :rows="0" />
          </template>
          <el-skeleton animated :rows="5" style="margin-top: 22px" />
        </el-card>
      </div>
      <el-card v-else-if="item">
        <template #header>
          <p v-if="item.created_at" class="my-0">{{ formatDate(item.created_at) }}</p>
          <h3 class="my-0">{{ item.f }} {{ item.i }} {{ item.o }}</h3>
        </template>

        <div class="detail__item">
          <h4 class="mb-2">ИНН</h4>
          <span>{{ item.inn }}</span>
        </div>
        <div class="detail__item">
          <h4 class="mb-2">ОГРН/ОГРНИП</h4>
          <span>{{ item.ogrn }}</span>
        </div>
        <div class="detail__item">
          <h4 class="mb-2">Налоговый статус</h4>
          <span>{{ item.tax_status }}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>
