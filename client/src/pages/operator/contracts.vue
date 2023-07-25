<script setup lang="ts">
import { Document } from '@element-plus/icons-vue';
</script>
<template>
  <div class="clients-page">
    <div class="container">
      <h1 class="mb-1">
        <el-icon size="25"><Document /></el-icon> Договора
      </h1>
      <small class="mb-5 d-block">
        Просмотр, добавление, редактирование, удаление договоров
      </small>
    </div>
    <router-view />

  </div>
</template>
