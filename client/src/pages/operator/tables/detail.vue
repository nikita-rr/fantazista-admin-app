<script setup lang="ts">
import { ArrowLeft, Document, Edit } from '@element-plus/icons-vue';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatDate } from '~/utils/date';
import * as api from '~/requests/tables';
import type { ITable } from '~/interfaces/ITable';

const loadingTimeout = 400;
const router = useRouter();
const route = useRoute();
const item = ref<ITable>();
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
            <el-icon size="18"><Document /></el-icon> Информация о столе
          </h2>
          <div class="page-sub-title__actions">
            <el-button-group>
              <el-button
                @click="router.push(`/tables/update/${item?.id}`)"
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
          <el-skeleton animated :rows="4" style="margin-top: 22px" />
        </el-card>
      </div>
      <el-card v-else-if="item">
        <template #header>
          <p v-if="item.created_at" class="my-0">{{ formatDate(item.created_at) }}</p>
          <h3 class="my-0">{{ item.type }}</h3>
        </template>

        <div class="detail__item">
          <h4 class="mb-2">Координаты</h4>
          <p>Широта (Lat): {{ item.lat }}</p>
          <p>Долгота (Lon): {{ item.lon }}</p>
        </div>

        <div class="detail__item">
          <h4 class="mb-2">Договор</h4>
          <router-link class="" :to="`/contracts/detail/${item.contractId}`">
            <span> Номер: {{ item.contract?.number }} </span>
          </router-link>
        </div>
      </el-card>
      <iframe
        v-if="item"
        :src="`https://maps.google.com/maps?q=${item.lat}, ${item.lon}&z=20&output=embed`"
        width="100%"
        height="270"
        frameborder="0"
        style="border: 0; border-radius: 4px; margin-top: 20px"
      >
      </iframe>
    </div>
  </div>
</template>
