<script setup lang="ts">
import Navigation from '~/components/operator/Navigation.vue';
</script>

<template>
  <div class="operator-layout">
    <navigation />
    <router-view />
  </div>
</template>

<style lang="scss">
.el-overlay {
  backdrop-filter: blur(4px);
}
</style>
