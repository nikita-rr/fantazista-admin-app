<script setup lang="ts">
import {
  ArrowLeft,
  Document,
  Edit,
  Tickets,
  Picture,
  Download,
} from '@element-plus/icons-vue';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatDate } from '~/utils/date';
import * as api from '~/requests/contracts';
import * as fileApi from '~/requests/contracts_files';
import type { ContractFile, IContract } from '~/interfaces/IContract';
import { formatNumber } from '~/utils/numbers';
import { displaySize } from '~/utils/filesize';
import FileDownload from 'js-file-download';
import { useProgress } from '~/composables/useProgress';

const loadingTimeout = 400;
const router = useRouter();
const route = useRoute();
const item = ref<IContract>();
const loading = ref(true);
const progress = useProgress();

onBeforeMount(async () => {
  let { data } = await api.detail(route.params.id as string);
  item.value = data;
  setTimeout(() => (loading.value = false), loadingTimeout);
});

function getFileIcon(ext: string) {
  let ret = null;
  switch (ext) {
    case '.png':
    case '.jpg':
    case '.jpeg':
      ret = Picture;
      break;

    default:
      ret = Tickets;
      break;
  }
  return ret;
}

async function download(file: ContractFile) {
  progress.emitStart();
  let { data } = await fileApi.download(file.id);
  setTimeout(() => {
    progress.emitEnd(() => {
      FileDownload(data, file.original_name);
    }, 'success');
  }, loadingTimeout);
}
</script>

<template>
  <div class="detail">
    <div class="page-sub-title">
      <div class="container">
        <div class="page-sub-title__inner">
          <h2 class="page-sub-title__title">
            <el-icon size="18"><Document /></el-icon> Информация о договоре
          </h2>
          <div class="page-sub-title__actions">
            <el-button-group>
              <el-button
                @click="router.push(`/contracts/update/${item?.id}`)"
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
          <el-skeleton animated :rows="13" style="margin-top: 22px" />
        </el-card>
      </div>
      <el-card v-else-if="item">
        <template #header>
          <p v-if="item.created_at" class="my-0">{{ formatDate(item.created_at) }}</p>
          <h3 class="my-0">{{ item.number }}</h3>
        </template>

        <div class="detail__item">
          <h4 class="mb-2">Клиент</h4>
          <router-link v-if="item.client" :to="`/clients/detail/${item.client.id}`">
            <span>ИНН: {{ item.client.inn }}</span>
            <span>({{ item.client.f }} {{ item.client.i }} {{ item.client.o }})</span>
          </router-link>
        </div>
        <div class="detail__item">
          <h4 class="mb-2">Дата</h4>
          <span>{{ formatDate(item.date) }}</span>
        </div>
        <div class="detail__item">
          <h4 class="mb-2">Сумма</h4>
          <span>{{ formatNumber(item.summ) }}₽</span>
        </div>
        <div class="detail__item">
          <h4 class="mb-2">Юридическое лицо</h4>
          <span v-if="item.legal_entity">{{ item.legal_entity }}</span>
          <i v-else>Не указано</i>
        </div>
        <div class="detail__item">
          <h4 class="mb-2">Бренд</h4>
          <span v-if="item.client_brand">{{ item.client_brand }}</span>
          <i v-else>Не указано</i>
        </div>
        <h3>Прикрепленные файлы:</h3>
        <div class="row" v-if="item.files && item.files.length">
          <div class="col-12 col-md-6 col-lg-4 mb-4" v-for="file in item.files">
            <el-card style="cursor: pointer" @click="download(file)">
              <p class="mt-0 mb-4 d-flex align-items-center">
                <el-icon class="mr-1" :size="20"
                  ><component :is="getFileIcon(file.extension)"></component></el-icon
                >{{ file.original_name }}
              </p>
              <p class="my-0 d-flex align-items-center justify-content-between">
                <el-text class="" size="small" tag="ins">
                  {{ displaySize(file.size) }}
                </el-text>
                <el-icon type="info"><Download /></el-icon>
              </p>
            </el-card>
          </div>
        </div>
        <p v-else><i>Нет прикрепленных файлов</i></p>
      </el-card>
    </div>
    <el-progress
      class="common-progress mt-5"
      :percentage="progress.percentage.value"
      :status="progress.status.value"
      :show-text="false"
      v-show="progress.percentage.value > 0"
      striped
      striped-flow
    />
  </div>
</template>
