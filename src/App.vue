<script lang="ts" setup>
import Cookie from './components/cookie/Cookie.vue';
import type { Ref } from 'vue';
import { ref } from 'vue';
import type { CookieData } from './mixins/types';
import { checkCookie, getCookie, setCookie } from './mixins/cookie';
import { findIndexById } from './mixins/utils';
import customSampleData from './assets/customSampleData.json';

// Declarations
const cookieName: Ref<string> = ref('cookie');
const cookieData: Ref<CookieData> = ref(checkCookie(cookieName.value) ? customSampleData : JSON.parse(getCookie(cookieName.value)));
const cookieVisible: Ref<boolean> = ref(false);
const isCustomized: Ref<boolean> = ref(true);

// Functions
const clickCookie = (action: string) => {
  cookieData.value.toggleButtonData.forEach((item) => {
    const itemIndex = findIndexById(cookieData.value.toggleButtonData, item.id);

    if (itemIndex > 0) {
      if (action === 'accept') {
        toggleCookie(item.id, true);
      } else if (action === 'decline') {
        toggleCookie(item.id, false);
      }
    }
  });

  storeCookie();
  closeCookie();
};

const closeCookie = () => {
  cookieVisible.value = false;
};

const openCookie = () => {
  cookieVisible.value = true;
};

const storeCookie = () => {
  setCookie(cookieName.value, cookieData.value, 10);
};

const toggleCookie = (id: number, isToggled: boolean) => {
  const itemIndex = findIndexById(cookieData.value.toggleButtonData, id);

  cookieData.value.toggleButtonData[itemIndex].isToggled = isToggled;
};
</script>

<template>
  <Button
      :label="isCustomized ? 'Show cookie' : 'Zobraziť cookie'"
      @click="openCookie()"
  />

  <Cookie
      v-if="isCustomized"
      v-model:visible="cookieVisible"
      :cookie-data="cookieData"
      :cookie-name="cookieName"
  >
    <template #header="slotProps">
      <h3 class="p-2">{{ slotProps.title }}</h3>
    </template>
    <template #default="slotProps">
      <p class="p-2">{{ slotProps.description }}</p>
    </template>
    <template #footer="slotProps">
      <div class="flex justify-content-between align-items-end p-1">
        <div
            v-for="item in slotProps.data.toggleButtonData"
            :key="item.id"
            class="flex flex-column justify-content-center align-items-center p-1"
        >
          <p class="text-center">{{ item.title }}</p>
          <ToggleButton
              :disabled="!item.optional"
              :model-value="item.isToggled"
              @change="toggleCookie(item.id, !item.isToggled)"
          />
        </div>
        <div class="flex flex-column justify-content-center align-items-start">
          <div v-for="item in slotProps.data.buttonData" :key="item.id" class="p-1">
            <Button
                v-if="item.isVisible"
                :label="item.title"
                @click="clickCookie(item.action)"
            />
          </div>
        </div>
      </div>
    </template>
  </Cookie>
  <Cookie v-else v-model:visible="cookieVisible"/>
</template>

<style lang="scss" scoped></style>
