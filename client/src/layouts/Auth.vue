<script setup lang="ts">
import ThemeSwitch from '~/components/ThemeSwitch.vue';
</script>
<template>
  <ThemeSwitch style="position: absolute; right: 20px; top: 10px" />
  <div class="container">
    <router-view />
  </div>
</template>
