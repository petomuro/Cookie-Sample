<script lang="ts" setup>
import CookieCore from './CookieCore.vue';
import type { Ref } from 'vue';
import { onUpdated, ref } from 'vue';
import { checkCookie, getCookie, setCookie } from '../../mixins/cookie';
import type { CookieData } from '../../mixins/types';
import { findIndexById } from '../../mixins/utils';
import sampleData from '../../assets/sampleData.json';

// Declarations
const props = defineProps({
  visible: Boolean,
  cookieData: {
    type: Object,
    default: checkCookie() ? sampleData : JSON.parse(getCookie('cookie')),
  },
});
const emits = defineEmits(['update:visible']);

const visible: Ref<boolean> = ref(checkCookie() || props.visible);
const data: Ref<CookieData> = ref(props.cookieData) as Ref<CookieData>;

// Functions
const toggleCookie = (event: {
  id: number;
  isToggled: boolean;
  optional: boolean;
}) => {
  const itemIndex = findIndexById(data.value.toggleButtonData, event.id);

  data.value.toggleButtonData[itemIndex].isToggled = event.isToggled;

  if (event.optional) {
    const { secondItemIndex, thirdItemIndex, isToggled } = isCookieToggled();

    if (isToggled) {
      data.value.buttonData[secondItemIndex].isToggled = true;
      data.value.buttonData[thirdItemIndex].isToggled = false;
    } else {
      data.value.buttonData[secondItemIndex].isToggled = false;
      data.value.buttonData[thirdItemIndex].isToggled = true;
    }
  }
};

const clickCookie = (action: string) => {
  if (action === 'accept') {
    data.value.toggleButtonData.forEach((item) =>
      toggleCookie({
        id: item.id,
        isToggled: true,
        optional: false,
      })
    );
  } else if (action === 'decline') {
    data.value.toggleButtonData.forEach((item) => {
      const itemIndex = findIndexById(data.value.toggleButtonData, item.id);

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
  const secondItemIndex = findIndexById(data.value.toggleButtonData, 2);
  const thirdItemIndex = findIndexById(data.value.toggleButtonData, 3);

  return {
    secondItemIndex: secondItemIndex,
    thirdItemIndex: thirdItemIndex,
    isToggled:
        data.value.toggleButtonData[secondItemIndex].isToggled ||
        data.value.toggleButtonData[thirdItemIndex].isToggled,
  };
};

const storeCookie = () => {
  setCookie('cookie', data.value, 10);
};

const closeCookie = (event: boolean) => {
  emits('update:visible', event);

  visible.value = event;
};

// Lifecycle hooks
onUpdated(() => {
  if (props.visible) {
    visible.value = props.visible;
  }
});
</script>

<template>
  <CookieCore
      v-if="visible"
      :cookie-data="data"
      :visible="visible"
      @on-toggle-cookie="toggleCookie($event)"
      @on-click-cookie="clickCookie($event)"
      @update:visible="closeCookie($event)"
  />
</template>

<style lang="scss" scoped></style>
