<script setup lang="ts">
import { ThemeType, useThemeStore } from '~/store/theme';
import logo from "~/public/logo.webp"
import logoBlack from "~/public/logo-black.webp"

const themeStore = useThemeStore();
const currentTheme = themeStore.getTheme();
</script>

<template>
  <div>
    <img class="app-logo" v-show="currentTheme === ThemeType.DARK" :src="logo" alt="F10" />
    <img class="app-logo"
      v-show="currentTheme === ThemeType.LIGHT"
      :src="logoBlack"
      alt="F10"
    />
  </div>
</template>


<style lang="scss">
.app-logo {
    max-width: 100%;
    margin-top: -12px;
}
</style>