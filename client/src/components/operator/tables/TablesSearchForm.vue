<script setup lang="ts">
import { Search, RefreshRight, Check, Close } from '@element-plus/icons-vue';
import { ref } from 'vue';
import type { IContract } from '~/interfaces/IContract';

import type { ITableFilter } from '~/interfaces/ITable';
import * as contractsApi from '~/requests/contracts';

const contracts = ref<IContract[]>([]);

const emit = defineEmits(['submit', 'cancel']);
const props = withDefaults(defineProps<{ loading: boolean }>(), {
  loading: false,
});
const form = ref<ITableFilter>({});
const show = ref(1);
async function searchContracts(query: string) {
  let { data } = await contractsApi.list(0, 50, { number: query });
  contracts.value = data;
}
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
      <el-form label-position="top">
        <div class="row">
          <div class="col-12 col-md-9">
            <el-form-item label="Тип">
              <el-input v-model="form.type" :maxlength="50" />
            </el-form-item>
          </div>
          <div class="col-12 col-md-4">
            <el-form-item label="Долгота">
              <el-input-number class="w-100" v-model="form.lat" />
            </el-form-item>
          </div>
          <div class="col-12 col-md-4">
            <el-form-item label="Широта">
              <el-input-number class="w-100" v-model="form.lon" />
            </el-form-item>
          </div>
          <div class="col-12 col-md-6">
            <el-form-item label="Договор">
              <el-select
                multiple
                class="w-100"
                v-model="form.contractsIds"
                filterable
                remote
                reserve-keyword
                placeholder="Номер договора..."
                :remote-method="searchContracts"
                :loading="loading"
              >
                <el-option
                  v-for="item in contracts"
                  :key="item.id"
                  :label="`${item.number} (${item.client?.i} ${item.client?.o})`"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-12 mt-3 mb-5">
            <el-button-group>
              <el-button
                type="primary"
                :icon="Check"
                :loading="loading"
                @click="emit('submit', form)"
              >
                Применить
              </el-button>
              <el-button type="warning" :icon="Close" @click="show = 0">
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
