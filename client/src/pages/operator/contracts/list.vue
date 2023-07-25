<script setup lang="ts">
import { Plus, Files, FolderOpened } from '@element-plus/icons-vue';
import { onBeforeMount } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ListItem from '~/components/operator/contracts/ContractsListItem.vue';
import ListItemSkeleton from '~/components/operator/contracts/ContractsListItemSkeleton.vue';
import SearchForm from '~/components/operator/contracts/ContractsSearchForm.vue';
import type { IContract } from '~/interfaces/IContract';
import * as api from '~/requests/contracts';

const loadingTimeout = 400;
const router = useRouter();
const items = ref<IContract[]>([]);
const searchLoading = ref(false);
const disableLoad = ref(false);
const isEmptyList = ref(false);
let searchFormData: Partial<IContract> = {};
let page = 0;
let limit = 10;

onBeforeMount(() => {
  setTimeout(getData, loadingTimeout);
});

async function getData() {
  if (!disableLoad.value) {
    disableLoad.value = true;
    let { data } = await api.list(page, limit, searchFormData);
    items.value.push(...data);
    isEmptyList.value = !items.value.length;
    if (data.length < limit) {
      disableLoad.value = true;
    } else {
      page++;
      disableLoad.value = false;
    }
  }
}

async function onSearchSubmit(form: Partial<IContract>) {
  searchLoading.value = true;
  isEmptyList.value = false;
  searchFormData = form;
  items.value = [];
  disableLoad.value = false;
  page = 0;
  setTimeout(async () => {
    await getData();
    searchLoading.value = false;
  }, loadingTimeout);
}

function onDeleteItem(id: string) {
  items.value = items.value.filter((i) => i.id !== id);
  isEmptyList.value = !items.value.length;
}
</script>

<template>
  <div class="contracts-list">
    <div class="container">
      <SearchForm @submit="onSearchSubmit" :loading="searchLoading" />
    </div>
    <div class="page-sub-title">
      <div class="container">
        <div class="page-sub-title__inner">
          <h2 class="page-sub-title__title">
            <el-icon size="18"><Files /></el-icon> Список договоров
          </h2>
          <div class="page-sub-title__actions">
            <el-button
              type="primary"
              :icon="Plus"
              @click="router.push('/contracts/create')"
              >Добавить</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row" v-if="items.length">
        <div class="col-12 col-md-6 mt-4" v-for="item in items">
          <ListItem
            class="h-100"
            :item="item"
            @delete="onDeleteItem"
            @click="router.push(`/contracts/detail/${item.id}`)"
            style="cursor: pointer;"
          />
        </div>
      </div>
      <div class="row" v-else-if="isEmptyList">
        <div class="mx-auto">
          <el-empty :image-size="200" description="Нет данных" />
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-12 col-md-6 mt-4" v-for="i in 10">
          <ListItemSkeleton />
        </div>
      </div>

      <div
        v-infinite-scroll="getData"
        :infinite-scroll-disabled="disableLoad"
        infinite-scroll-distance="10"
      ></div>
    </div>
  </div>
</template>
