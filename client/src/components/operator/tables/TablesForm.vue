<script setup lang="ts">
import { Finished, RefreshRight } from '@element-plus/icons-vue';
import { onBeforeMount, ref } from 'vue';
import type { IContract } from '~/interfaces/IContract';
import * as contractsApi from '~/requests/contracts';
import type { ITable } from '~/interfaces/ITable';

const emit = defineEmits(['submit']);
const props = withDefaults(
  defineProps<{ formData: Partial<ITable>; loading: boolean }>(),
  {
    formData: () => ({}),
    loading: false,
  },
);

const contracts = ref<IContract[]>([]);

async function searchContracts(query: string) {
  let { data } = await contractsApi.list(0, 50, { number: query });
  contracts.value = data;
}

const form = ref(props.formData);

function submitForm() {
  // iOS fix
  if (Array.isArray(form.value.contractId)) {
    emit('submit', { ...form.value, contractId: form.value.contractId[0] });
  } else {
    emit('submit', form.value);
  }
}

onBeforeMount(() => {
  if (form.value.contract?.id) {
    contracts.value = [form.value.contract];
    // iOS fix
    // @ts-ignore
    form.value.contractId = [form.value.contract.id];
  }
});
</script>

<template>
  <el-form label-position="top">
    <div class="row">
      <div class="col-12 col-md-9">
        <el-form-item label="Тип" required>
          <el-input v-model="form.type" :maxlength="50" />
        </el-form-item>
      </div>
      <div class="col-12 col-md-6">
        <el-form-item label="Договор" required>
          <el-select
            multiple
            :multiple-limit="1"
            class="w-100"
            v-model="form.contractId"
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
      <div class="col-12 col-md-4">
        <el-form-item label="Долгота" required>
          <el-input-number class="w-100" v-model="form.lat" />
        </el-form-item>
      </div>
      <div class="col-12 col-md-4">
        <el-form-item label="Широта" required>
          <el-input-number class="w-100" v-model="form.lon" />
        </el-form-item>
      </div>

      <div class="col-12 mt-3">
        <el-button-group>
          <el-button
            type="primary"
            :icon="Finished"
            :loading="loading"
            @click="submitForm"
          >
            Сохранить
          </el-button>
          <el-button type="danger" :icon="RefreshRight" @click="form = {}">
            Очистить форму
          </el-button>
        </el-button-group>
      </div>
    </div>
  </el-form>
</template>
