<script setup lang="ts">
import { Finished, RefreshRight } from '@element-plus/icons-vue';
</script>

<template>
  <el-form label-position="top">
    <div class="row">
      <div class="col-12 col-md-9">
        <el-form-item label="Тип">
          <el-skeleton class="skeleton-item-full-width" animated :rows="0" />
        </el-form-item>
      </div>
      <div class="col-12 col-md-4">
        <el-form-item label="Долгота">
          <el-skeleton class="skeleton-item-full-width" animated :rows="0" />
        </el-form-item>
      </div>
      <div class="col-12 col-md-4">
        <el-form-item label="Широта">
          <el-skeleton class="skeleton-item-full-width" animated :rows="0" />
        </el-form-item>
      </div>
      <div class="col-12 col-md-6">
        <el-form-item label="Договор">
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
