<script setup lang="ts">
import { Finished, RefreshRight } from '@element-plus/icons-vue';
import { ref } from 'vue';

import type { IClient } from '~/interfaces/IClient';

const emit = defineEmits(['submit']);
const props = withDefaults(defineProps<{ formData: Partial<IClient>; loading: boolean }>(), {
  formData: () => ({}),
  loading: false,
});

const form = ref(props.formData);

</script>

<template>
  <el-form label-position="top">
    <div class="row">
      <div class="col-12 col-md-4">
        <el-form-item label="Фамилия" required>
          <el-input v-model="form.f" :maxlength="50" />
        </el-form-item>
      </div>
      <div class="col-12 col-md-4">
        <el-form-item label="Имя" required>
          <el-input v-model="form.i" :maxlength="50" />
        </el-form-item>
      </div>
      <div class="col-12 col-md-4">
        <el-form-item label="Очество" required>
          <el-input v-model="form.o" :maxlength="50" />
        </el-form-item>
      </div>
      <div class="col-12 col-md-6">
        <el-form-item label="Налоговый статус" required>
          <el-input v-model="form.tax_status" />
        </el-form-item>
      </div>
      <div class="col-12 col-md-6">
        <el-form-item label="ИНН" required>
          <el-input
            v-model="form.inn"
            :formatter="(value: string) => `${value}`.replace(/^\D/g, '')"
            :maxlength="10"
          />
        </el-form-item>
      </div>
      <div class="col-12 col-md-6">
        <el-form-item label="ОГРН/ОГРНИП" required>
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
            :icon="Finished"
            :loading="loading"
            @click="emit('submit', form)"
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
