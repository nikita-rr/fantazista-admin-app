<script setup lang="ts">
import { Search, RefreshRight, Check, Close } from '@element-plus/icons-vue';
import { ref } from 'vue';
import * as clientsApi from '~/requests/clients';
import type { IContractFilter } from '~/interfaces/IContract';
import type { IClient } from '~/interfaces/IClient';

const emit = defineEmits(['submit', 'cancel']);
const props = withDefaults(defineProps<{ loading: boolean }>(), {
  loading: false,
});
const form = ref<Partial<IContractFilter>>({});
const show = ref(1);

const clients = ref<IClient[]>([]);

async function searchClients(query: string) {
  let { data } = await clientsApi.list(0, 50, { inn: query });
  clients.value = data;
}

function submitForm() {
  emit('submit', form.value);
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
      <el-form label-position="top" class="mt-3">
        <div class="row">
          <div class="col-12 col-md-6">
            <el-form-item label="Номер договора">
              <el-input v-model="form.number" :maxlength="50" />
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="border-card">
              <div class="row">
                <div class="col-12"><el-text size="large">Дата</el-text></div>
                <div class="col-12 col-md-6">
                  <el-form-item label="От">
                    <el-date-picker
                      class="w-100"
                      v-model="form.date_start"
                      type="date"
                      placeholder="Выберите дату"
                      format="DD.MM.YYYY"
                    />
                  </el-form-item>
                </div>
                <div class="col-12 col-md-6">
                  <el-form-item label="До">
                    <el-date-picker
                      class="w-100"
                      v-model="form.date_end"
                      type="date"
                      placeholder="Выберите дату"
                      format="DD.MM.YYYY"
                    />
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="border-card">
              <div class="row">
                <div class="col-12"><el-text size="large">Сумма (₽)</el-text></div>
                <div class="col-12 col-md-6">
                  <el-form-item label="От">
                    <el-input-number
                      class="w-100"
                      v-model="form.summ_start"
                      :min="0"
                      controls-position="right"
                    />
                  </el-form-item>
                </div>
                <div class="col-12 col-md-6">
                  <el-form-item label="До">
                    <el-input-number
                      class="w-100"
                      v-model="form.summ_end"
                      :min="0"
                      controls-position="right"
                    />
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-6">
            <el-form-item label="Клиент">
              <el-select
                multiple
                :multiple-limit="5"
                class="w-100"
                v-model="form.clientsIds"
                filterable
                clearable
                remote
                reserve-keyword
                placeholder="ИНН клиента..."
                :remote-method="searchClients"
                :loading="loading"
              >
                <el-option
                  v-for="item in clients"
                  :key="item.id"
                  :label="`${item.inn} (${item.f} ${item.i} ${item.o})`"
                  :value="item.id"
                >
                  {{ item.inn }} <i>{{ `(${item.f} ${item.i} ${item.o})` }}</i>
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-12 col-md-6">
            <el-form-item label="Юридическое лицо клиента">
              <el-input v-model="form.legal_entity" :maxlength="50" />
            </el-form-item>
          </div>
          <div class="col-12 col-md-6">
            <el-form-item label="Бренд клиента">
              <el-input v-model="form.client_brand" :maxlength="50" />
            </el-form-item>
          </div>
          <div class="col-12 mt-3">
            <el-button-group>
              <el-button
                type="primary"
                :icon="Check"
                :loading="loading"
                @click="submitForm()"
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
