<script lang="ts" setup>
import Cookie from './components/cookie/Cookie.vue';
import type { Ref } from 'vue';
import { ref } from 'vue';
import { checkCookies, getCookies, setCookies } from './mixins/cookies';
import type { CookieData, } from './mixins/types';
import { findIndexById } from './mixins/utils';
import sampleData from '../public/sampleData.json';

// Declarations
const cookieData: Ref<CookieData> = ref(checkCookies() ? sampleData as CookieData : JSON.parse(getCookies('cookies')) as CookieData);

// Functions
const toggleCookies = (event: { id: number; isToggled: boolean; optional: boolean }) => {
  const itemIndex = findIndexById(cookieData.value.toggleButtonData, event.id);

  cookieData.value.toggleButtonData[itemIndex].isToggled = event.isToggled;

  if (event.optional) {
    const { secondItemIndex, thirdItemIndex, isToggled } = isCookiesToggled();

    if (isToggled) {
      cookieData.value.buttonData[secondItemIndex].isToggled = true;
      cookieData.value.buttonData[thirdItemIndex].isToggled = false;
    } else {
      cookieData.value.buttonData[secondItemIndex].isToggled = false;
      cookieData.value.buttonData[thirdItemIndex].isToggled = true;
    }
  }
};

const clickCookies = (action: string) => {
  if (action === 'accept') {
    cookieData.value.toggleButtonData.forEach((item) => toggleCookies({ id: item.id, isToggled: true, optional: false }));
  } else if (action === 'decline') {
    cookieData.value.toggleButtonData.forEach((item) => {
      const itemIndex = findIndexById(cookieData.value.toggleButtonData, item.id);

      if (itemIndex > 0) {
        toggleCookies({ id: item.id, isToggled: false, optional: true });
      }
    });
  }

  storeCookies();
};

const isCookiesToggled = (): { secondItemIndex: number; thirdItemIndex: number; isToggled: boolean } => {
  const secondItemIndex = findIndexById(cookieData.value.toggleButtonData, 2);
  const thirdItemIndex = findIndexById(cookieData.value.toggleButtonData, 3);

  return {
    secondItemIndex: secondItemIndex,
    thirdItemIndex: thirdItemIndex,
    isToggled: (cookieData.value.toggleButtonData[secondItemIndex].isToggled || cookieData.value.toggleButtonData[thirdItemIndex].isToggled)
  };
};

const storeCookies = () => {
  setCookies('cookies', cookieData.value, 10);
};
</script>

<template>
  <Cookie
      :cookie-data="cookieData"
      @on-toggle-cookies="toggleCookies($event)"
      @on-click-cookies="clickCookies($event)"
  />
</template>

<style lang="scss" scoped></style>
