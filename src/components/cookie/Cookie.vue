<script lang="ts" setup>
import CookieCore from './CookieCore.vue';
import type { Ref } from 'vue';
import { ref } from 'vue';
import { checkCookie, getCookie, setCookie } from '../../mixins/cookie';
import type { CookieData } from '../../mixins/types';
import { findIndexById } from '../../mixins/utils';
import sampleData from '../../assets/sampleData.json';

// Declarations
const cookieData: Ref<CookieData> = ref(
  checkCookie() ? sampleData : JSON.parse(getCookie('cookie'))
);
const cookieCoreRef: Ref<CookieCore> = ref(CookieCore);

// Functions
const toggleCookie = (event: {
  id: number;
  isToggled: boolean;
  optional: boolean;
}) => {
  const itemIndex = findIndexById(cookieData.value.toggleButtonData, event.id);

  cookieData.value.toggleButtonData[itemIndex].isToggled = event.isToggled;

  if (event.optional) {
    const { secondItemIndex, thirdItemIndex, isToggled } = isCookieToggled();

    if (isToggled) {
      cookieData.value.buttonData[secondItemIndex].isToggled = true;
      cookieData.value.buttonData[thirdItemIndex].isToggled = false;
    } else {
      cookieData.value.buttonData[secondItemIndex].isToggled = false;
      cookieData.value.buttonData[thirdItemIndex].isToggled = true;
    }
  }
};

const clickCookie = (action: string) => {
  if (action === 'accept') {
    cookieData.value.toggleButtonData.forEach((item) =>
      toggleCookie({
        id: item.id,
        isToggled: true,
        optional: false,
      })
    );
  } else if (action === 'decline') {
    cookieData.value.toggleButtonData.forEach((item) => {
      const itemIndex = findIndexById(
        cookieData.value.toggleButtonData,
        item.id
      );

      if (itemIndex > 0) {
        toggleCookie({ id: item.id, isToggled: false, optional: true });
      }
    });
  }

  storeCookie();
};

const isCookieToggled = (): {
  secondItemIndex: number;
  thirdItemIndex: number;
  isToggled: boolean;
} => {
  const secondItemIndex = findIndexById(cookieData.value.toggleButtonData, 2);
  const thirdItemIndex = findIndexById(cookieData.value.toggleButtonData, 3);

  return {
    secondItemIndex: secondItemIndex,
    thirdItemIndex: thirdItemIndex,
    isToggled:
        cookieData.value.toggleButtonData[secondItemIndex].isToggled ||
        cookieData.value.toggleButtonData[thirdItemIndex].isToggled,
  };
};

const storeCookie = () => {
  setCookie('cookie', cookieData.value, 10);
};

const openCookie = () => {
  cookieCoreRef.value.openCookie();
};

// Expose
defineExpose({
  openCookie,
});
</script>

<template>
  <CookieCore
      ref="cookieCoreRef"
      :cookie-data="cookieData"
      @on-toggle-cookie="toggleCookie($event)"
      @on-click-cookie="clickCookie($event)"
  >
    <template #header>
      <slot name="header"/>
    </template>
    <template #default>
      <slot/>
    </template>
    <template #footer-toggle-buttons>
      <slot name="footer-toggle-buttons"/>
    </template>
    <template #footer-buttons>
      <slot name="footer-buttons"/>
    </template>
  </CookieCore>
</template>

<style lang="scss" scoped></style>
