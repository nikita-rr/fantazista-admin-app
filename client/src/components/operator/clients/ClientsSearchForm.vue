<script setup lang="ts">
import { Search, RefreshRight, Check, Close } from '@element-plus/icons-vue';
import { ref } from 'vue';

import type { IClient } from '~/interfaces/IClient';

const emit = defineEmits(['submit', 'cancel']);
const props = withDefaults(defineProps<{ loading: boolean }>(), {
  loading: false,
});
const form = ref<Partial<IClient>>({});
const show = ref(1)
</script>

<template>
  <el-collapse v-model="show">
    <el-collapse-item name="1">
      <template #title>
        <el-text>
          <h2 class="d-flex align-items-center">
            <el-icon class="mr-2"><Search /></el-icon> Поиск
          </h2>
        </el-text>
      </template>
      <el-form label-position="top" class="mt-3">
        <div class="row">
          <div class="col-12 col-md-4">
            <el-form-item label="Фамилия">
              <el-input v-model="form.f" :maxlength="50" />
            </el-form-item>
          </div>
          <div class="col-12 col-md-4">
            <el-form-item label="Имя">
              <el-input v-model="form.i" :maxlength="50" />
            </el-form-item>
          </div>
          <div class="col-12 col-md-4">
            <el-form-item label="Очество">
              <el-input v-model="form.o" :maxlength="50" />
            </el-form-item>
          </div>
          <div class="col-12 col-md-6">
            <el-form-item label="Налоговый статус">
              <el-input v-model="form.tax_status" :maxlength="50" />
            </el-form-item>
          </div>
          <div class="col-12 col-md-6">
            <el-form-item label="ИНН">
              <el-input
                v-model="form.inn"
                :formatter="(value: string) => `${value}`.replace(/^\D/g, '')"
                :maxlength="10"
              />
            </el-form-item>
          </div>
          <div class="col-12 col-md-6">
            <el-form-item label="ОГРН/ОГРНИП">
              <el-input
                v-model="form.ogrn"
                :formatter="(value: string) => `${value}`.replace(/^\D/g, '')"
                :maxlength="15"
              />
            </el-form-item>
          </div>
          <div class="col-12 mt-3">
            <el-button-group>
              <el-button
                type="primary"
                :icon="Check"
                :loading="loading"
                @click="emit('submit', form)"
              >
                Применить
              </el-button>
              <el-button
                type="warning"
                :icon="Close"
                @click="show = 0"
              >
                Закрыть
              </el-button>
              <el-button
                :disabled="JSON.stringify(form) === '{}'"
                type="danger"
                :icon="RefreshRight"
                @click="(form = {}), emit('submit')"
              >
                Отмена
              </el-button>
            </el-button-group>
          </div>
        </div>
      </el-form>
    </el-collapse-item>
  </el-collapse>
</template>
