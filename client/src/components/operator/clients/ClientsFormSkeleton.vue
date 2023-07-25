<script setup lang="ts">
import { Finished, RefreshRight } from '@element-plus/icons-vue';
</script>

<template>
  <el-form label-position="top">
    <div class="row">
      <div class="col-12 col-md-4">
        <el-form-item label="Фамилия" required>
          <el-skeleton class="skeleton-item-full-width" animated :rows="0" />
        </el-form-item>
      </div>
      <div class="col-12 col-md-4">
        <el-form-item label="Имя" required>
          <el-skeleton class="skeleton-item-full-width" animated :rows="0" />
        </el-form-item>
      </div>
      <div class="col-12 col-md-4">
        <el-form-item label="Очество" required>
          <el-skeleton class="skeleton-item-full-width" animated :rows="0" />
        </el-form-item>
      </div>
      <div class="col-12 col-md-6">
        <el-form-item label="Налоговый статус" required>
          <el-skeleton class="skeleton-item-full-width" animated :rows="0" />
        </el-form-item>
      </div>
      <div class="col-12 col-md-6">
        <el-form-item label="ИНН" required>
          <el-skeleton class="skeleton-item-full-width" animated :rows="0" />
        </el-form-item>
      </div>
      <div class="col-12 col-md-6">
        <el-form-item label="ОГРН/ОГРНИП" required>
          <el-skeleton class="skeleton-item-full-width" animated :rows="0" />
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
