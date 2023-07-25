<script setup lang="ts">
import { Edit, View, Delete } from '@element-plus/icons-vue';
</script>
<template>
  <el-card style="height: 187px;">
    <template #header>
      <div class="d-flex justify-content-between align-items-start">
        <div class="w-100">
          <el-skeleton animated :rows="0" class="mr-3" />
        </div>

        <el-button-group class="d-flex">
          <el-button disabled type="primary" size="small" :icon="View"> </el-button>
          <el-button disabled type="warning" size="small" :icon="Edit"> </el-button>
          <el-button disabled type="danger" size="small" :icon="Delete"> </el-button>
        </el-button-group>
      </div>
    </template>
    <el-skeleton animated :rows="2" />
  </el-card>
</template>
