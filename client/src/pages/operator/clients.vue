<script setup lang="ts">
import { User } from '@element-plus/icons-vue';
</script>
<template>
  <div class="clients-page">
    <div class="container">
      <h1 class="mb-1">
        <el-icon size="25"><User /></el-icon> Клиенты
      </h1>
      <small class="mb-5 d-block">
        Просмотр, добавление, редактирование, удаление клиентов
      </small>
    </div>
    <router-view />

  </div>
</template>
