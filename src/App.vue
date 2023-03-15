<script lang="ts" setup>
import Cookie from './components/cookie/Cookie.vue';
import type { Ref } from 'vue';
import { ref } from 'vue';
import type { CookieData } from './mixins/types';
import { checkCookie, getCookie } from './mixins/cookie';
import customSampleData from './assets/customSampleData.json';

// Declarations
const isCustomized: Ref<boolean> = ref(true);
const isActive: Ref<boolean> = ref(false);
const data: Ref<CookieData> = ref(checkCookie() ? customSampleData : JSON.parse(getCookie('cookie')));

// Functions
const openCookie = () => {
  isActive.value = true;
};
</script>

<template>
  <Button
      :label="isCustomized ? 'Show cookie' : 'Zobraziť cookie'"
      @click="openCookie()"
  />

  <Cookie
      v-if="isCustomized"
      v-model:visible="isActive"
      :cookie-data="data"
  />
  <Cookie v-else v-model:visible="isActive"/>
</template>

<style lang="scss" scoped></style>
