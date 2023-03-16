<script lang="ts" setup>
import Cookie from './components/cookie/Cookie.vue';
import type { Ref } from 'vue';
import { ref } from 'vue';
import type { CookieData, CookiePosition } from './mixins/types';
import { checkCookie, setCookie } from './mixins/cookie';
import { findIndexById } from './mixins/utils';
import customSampleData from './assets/customSampleData.json';

// Declarations
const cookieName: Ref<string> = ref('COOKIE_AGREEMENT');
const cookieClasses: Ref<string> = ref('w-auto lg:w-11 xl:w-9');
const cookieData: Ref<CookieData> = ref(customSampleData);
const cookieExDays: Ref<number> = ref(10);
const cookiePosition: Ref<CookiePosition> = ref('top');
const cookieVisible: Ref<boolean> = ref(checkCookie(cookieName.value) || false);
const isCustomized: Ref<boolean> = ref(false);

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

  cookieVisible.value = false;
};

const storeCookie = () => {
  const names = cookieData.value.toggleButtonData.map((item) =>
    item.isToggled ? item.name : undefined
  );
  const filteredNames = names.filter((item) => item !== undefined);
  const concatNames = filteredNames.join('_');

  setCookie(cookieName.value, concatNames, cookieExDays.value);
};

const toggleCookie = (id: number, isToggled: boolean) => {
  const itemIndex = findIndexById(cookieData.value.toggleButtonData, id);

  cookieData.value.toggleButtonData[itemIndex].isToggled = isToggled;
};
</script>

<template>
  <Button
      :label="isCustomized ? 'Show cookie' : 'Zobraziť cookie'"
      @click="cookieVisible = true"
  />

  <Cookie
      v-if="isCustomized"
      v-model:cookie-visible="cookieVisible"
      :cookie-classes="cookieClasses"
      :cookie-data="cookieData"
      :cookie-ex-days="cookieExDays"
      :cookie-name="cookieName"
      :cookie-position="cookiePosition"
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
          <div
              v-for="item in slotProps.data.buttonData"
              :key="item.id"
              class="p-1"
          >
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
  <Cookie v-else v-model:cookie-visible="cookieVisible"/>
</template>

<style lang="scss" scoped></style>
