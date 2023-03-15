<script lang="ts" setup>
import Cookie from './components/cookie/Cookie.vue';
import type { Ref } from 'vue';
import { ref } from 'vue';
import { checkCookie, getCookie } from './mixins/cookie';
import sampleData from './assets/sampleData.json';
import type { CookieData } from './mixins/types';

const cookieData: Ref<CookieData> = ref(checkCookie() ? sampleData : JSON.parse(getCookie('cookie')));
</script>

<template>
  <Cookie :cookie-data="cookieData"/>
</template>

<style lang="scss" scoped></style>
