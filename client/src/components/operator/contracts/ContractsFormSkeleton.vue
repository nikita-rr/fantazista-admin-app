<script setup lang="ts">
import { Finished, RefreshRight, UploadFilled } from '@element-plus/icons-vue';
</script>

<template>
  <el-form label-position="top">
    <div class="row">
      <div class="col-12 col-md-6">
        <el-form-item label="Номер договора" required>
          <el-skeleton class="skeleton-item-full-width" animated :rows="0" />
        </el-form-item>
      </div>
      <div class="col-12 col-md-3">
        <el-form-item label="Дата" required>
          <el-skeleton class="skeleton-item-full-width" animated :rows="0" />
        </el-form-item>
      </div>
      <div class="col-12 col-md-3">
        <el-form-item label="Сумма (₽)" required>
          <el-skeleton class="skeleton-item-full-width" animated :rows="0" />
        </el-form-item>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <el-form-item label="Клиент" required>
          <el-skeleton class="skeleton-item-full-width" animated :rows="0" />
        </el-form-item>
      </div>
      <div class="col-12 col-md-6">
        <el-form-item label="Юридическое лицо клиента">
          <el-skeleton class="skeleton-item-full-width" animated :rows="0" />
        </el-form-item>
      </div>
      <div class="col-12 col-md-6">
        <el-form-item label="Бренд клиента">
          <el-skeleton class="skeleton-item-full-width" animated :rows="0" />
        </el-form-item>
      </div>
      <div class="col-12">
        <el-form-item label="Загрузить файлы">
          <el-button type="primary" :icon="UploadFilled" disabled
            >Нажмите для загрузки</el-button
          >
        </el-form-item>
      </div>
      <div class="col-12 mt-3 mb-5">
        <el-button-group>
          <el-button type="primary" :icon="Finished" disabled> Сохранить </el-button>
          <el-button type="danger" :icon="RefreshRight" disabled>
            Очистить форму
          </el-button>
        </el-button-group>
      </div>
    </div>
  </el-form>
</template>
