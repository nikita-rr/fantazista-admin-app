<script setup lang="ts">
import { onMounted } from 'vue';
import axios from 'axios'
onMounted(() => {
    axios.get('/api/')
});
</script>
<template>
  <h2>Admin Index Page</h2>
</template>
