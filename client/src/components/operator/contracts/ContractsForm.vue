<script setup lang="ts">
import { Finished, RefreshRight } from '@element-plus/icons-vue';
import { onBeforeMount, ref, watch } from 'vue';
import type { IClient } from '~/interfaces/IClient';
import type { IContractForm } from '~/interfaces/IContract';
import * as clientsApi from '~/requests/clients';
import * as contractsFilesApi from '~/requests/contracts_files';
import { UploadFilled } from '@element-plus/icons-vue';
import type { IUploadFile } from '~/interfaces/IUploadFile';
const emit = defineEmits(['submit']);
const props = withDefaults(
  defineProps<{ formData?: Partial<IContractForm>; loading: boolean }>(),
  {
    formData: () => ({}),
    loading: false,
  },
);

const clients = ref<IClient[]>([]);

const form = ref(props.formData);

const fileList = ref<IUploadFile[]>([]);

const select = ref();

async function searchClients(query: string) {
  let { data } = await clientsApi.list(0, 50, { inn: query });
  clients.value = data;
}

function submitForm() {
  // iOS fix
  if (Array.isArray(form.value.clientId)) {
    emit('submit', { ...form.value, clientId: form.value.clientId[0] });
  } else {
    emit('submit', form.value);
  }
}

async function onFileRemove(file: IUploadFile) {
  if (file.isDownloaded) {
    await contractsFilesApi._delete(String(file.uid));
  }
}

onBeforeMount(() => {
  if (form.value.client?.id) {
    clients.value = [form.value.client];
    // iOS fix
    // @ts-ignore
    form.value.clientId = [form.value.client.id];
  }
  if (form.value.files) {
    fileList.value = form.value.files.map((i) => ({
      name: i.original_name,
      size: i.size,
      uid: i.id,
      status: 'success',
      isDownloaded: true,
    }));
  }
});

watch([fileList], ([newFileList]) => {
  form.value._files = newFileList.map((i) => i.raw);
});
</script>

<template>
  <el-form label-position="top">
    <div class="row">
      <div class="col-12 col-md-6">
        <el-form-item label="Номер договора" required>
          <el-input v-model="form.number" :maxlength="50" />
        </el-form-item>
      </div>
      <div class="col-12 col-md-3">
        <el-form-item label="Дата" required>
          <el-date-picker
            class="w-100"
            v-model="form.date"
            type="date"
            placeholder="Выберите дату"
            format="DD.MM.YYYY"
          />
        </el-form-item>
      </div>
      <div class="col-12 col-md-3" required>
        <el-form-item label="Сумма (₽)">
          <el-input-number
            class="w-100"
            v-model="form.summ"
            :min="0"
            controls-position="right"
          />
        </el-form-item>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <el-form-item label="Клиент" required>
          <el-select
            multiple
            :multiple-limit="1"
            class="w-100"
            :ref="select"
            v-model="form.clientId"
            filterable
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
      <div class="col-12">
        <el-form-item label="Загрузить файлы">
          <el-upload
            :auto-upload="false"
            v-model:file-list="fileList"
            action="#"
            multiple
            :on-remove="onFileRemove"
            accept="image/jpeg,image/jpg,image/png,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          >
            <el-button type="primary" :icon="UploadFilled"
              >Нажмите для загрузки</el-button
            >
            <template #tip>
              <div class="el-upload__tip">
                Разрешена загрузка изображений, .pdf, .doc и .docx файлов
              </div>
            </template>
          </el-upload>
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
