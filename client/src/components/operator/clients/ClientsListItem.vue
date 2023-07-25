<script setup lang="ts">
import { Edit, View, Delete, Calendar } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import { formatDate } from '~/utils/date';
import type { IClient } from '~/interfaces/IClient';
import * as api from '~/requests/clients';
const router = useRouter();
const emit = defineEmits(['delete']);
const props = defineProps<{ item: IClient }>();
async function deleteItem(id?: string) {
  if (id) {
    try {
      await ElMessageBox.confirm('Удаление клиента приведет к удалению всех договоров связаных с ним. Продолжить?', 'Внимание!', {
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
          <el-text class="mt-1" tag="h2" size="large"
            >{{ item.f }} {{ item.i }} {{ item.o }}</el-text
          >
        </div>
        <el-button-group class="d-flex">
          <el-button
            @click.stop="router.push(`/clients/detail/${item.id}`)"
            type="primary"
            size="small"
            :icon="View"
          >
          </el-button>
          <el-button
            @click.stop="router.push(`/clients/update/${item.id}`)"
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
      <el-text class="" type="info">ИНН: </el-text>
      <el-text class="">{{ item.inn }}</el-text>
    </div>
    <div class="mt-1">
      <el-text class="" type="info">ОГРН/ОГРНИП: </el-text>
      <el-text class="">{{ item.ogrn }}</el-text>
    </div>
    <div class="mt-1">
      <el-text class="" type="info">Налоговый статус: </el-text>
      <el-text class="">{{ item.tax_status }}</el-text>
    </div>
  </el-card>
</template>
