<script setup lang="ts">
import { Edit, View, Delete, Calendar } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import { formatDate } from '~/utils/date';
import { formatNumber } from '~/utils/numbers';
import type { IContract } from '~/interfaces/IContract';
import * as api from '~/requests/contracts';
const router = useRouter();
const emit = defineEmits(['delete']);
const props = defineProps<{ item: IContract }>();
async function deleteItem(id?: string) {
  if (id) {
    try {
      await ElMessageBox.confirm('Удаление договора приведет к удалению всех столов связаных с ним. Продолжить?', 'Внимание!', {
        confirmButtonText: 'Да',
        cancelButtonText: 'Отмена',
        type: 'error',
      });
      await api._delete(id);
      ElMessage({
        type: 'success',
        message: 'Запись успешно удалена',
      });
      emit('delete', id);
    } catch (error) {
      console.error(error);
    }
  }
}
</script>
<template>
  <el-card>
    <template #header>
      <div class="d-flex justify-content-between align-items-start">
        <div class="mr-3">
          <small class="d-flex align-items-center" v-if="item.created_at">
            <el-icon class="mr-1"><Calendar /></el-icon>
            {{ formatDate(item.created_at) }}
          </small>
          <el-text class="mt-1" tag="h2" size="large">№ {{ item.number }}</el-text>
        </div>
        <el-button-group class="d-flex">
          <el-button
            @click.stop="router.push(`/contracts/detail/${item.id}`)"
            type="primary"
            size="small"
            :icon="View"
          >
          </el-button>
          <el-button
            @click.stop="router.push(`/contracts/update/${item.id}`)"
            type="warning"
            size="small"
            :icon="Edit"
          >
          </el-button>
          <el-button
            @click.stop="deleteItem(item.id)"
            type="danger"
            size="small"
            :icon="Delete"
          >
          </el-button>
        </el-button-group>
      </div>
    </template>
    <div class="mt-1">
      <el-text class="" type="info"> Дата: </el-text>
      <el-text class="">{{ formatDate(item.date, 'DD.MM.YYYY') }}</el-text>
    </div>
    <div class="mt-1">
      <el-text class="" type="info">
        Сумма:
        <el-text type="primary">{{ formatNumber(item.summ) }} ₽</el-text>
      </el-text>
    </div>
    <div class="mt-1" v-if="item.client">
      <el-text class="" type="info"
        >Клиент:

        <router-link class="" :to="`/clients/detail/${item.client.id}`">
          <span> ИНН: {{ item.client.inn }} </span>
          <span> ({{ item.client.f }} {{ item.client.i }} {{ item.client.o }}) </span>
        </router-link>
      </el-text>
    </div>
  </el-card>
</template>
