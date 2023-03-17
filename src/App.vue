<script lang="ts" setup>
import Cookie from './components/cookie/Cookie.vue';
import type { Ref } from 'vue';
import { ref } from 'vue';
import type { CookieData, CookiePosition } from './mixins/types';
import { checkCookie, setCookie } from './mixins/cookie';
import { findIndexById } from './mixins/utils';
import customSampleData from './assets/customSampleData.json';

// Declarations
const cookieVisible: Ref<boolean> = ref(false);
const customizedCookieName: Ref<string> = ref('CUSTOMIZED_COOKIE_AGREEMENT');
const customizedCookieClasses: Ref<string> = ref('w-auto lg:w-11 xl:w-9');
const customizedCookieData: Ref<CookieData> = ref(customSampleData);
const customizedCookieExDays: Ref<number> = ref(20);
const customizedCookiePosition: Ref<CookiePosition> = ref('top');
const customizedCookieVisible: Ref<boolean> = ref(
  checkCookie(customizedCookieName.value) || false
);
const isCustomized: Ref<boolean> = ref(false);

// Functions
const clickCookie = (action: string) => {
  customizedCookieData.value.toggleButtonData.forEach((item) => {
    const itemIndex = findIndexById(
      customizedCookieData.value.toggleButtonData,
      item.id
    );

    if (itemIndex > 0) {
      if (action === 'accept') {
        toggleCookie(item.id, true);
      } else if (action === 'decline') {
        toggleCookie(item.id, false);
      }
    }
  });

  storeCookie();

  customizedCookieVisible.value = false;
};

const storeCookie = () => {
  const names = customizedCookieData.value.toggleButtonData.map((item) =>
    item.isToggled ? item.name : undefined
  );
  const filteredNames = names.filter((item) => item !== undefined);
  const concatNames = filteredNames.join('_');

  setCookie(
    customizedCookieName.value,
    concatNames,
    customizedCookieExDays.value
  );
};

const toggleCookie = (id: number, isToggled: boolean) => {
  const itemIndex = findIndexById(
    customizedCookieData.value.toggleButtonData,
    id
  );

  customizedCookieData.value.toggleButtonData[itemIndex].isToggled = isToggled;
};
</script>

<template>
  <Button
    v-if="isCustomized"
    :label="'Show cookie'"
    @click="customizedCookieVisible = true"
  />
  <Button v-else :label="'Zobraziť cookie'" @click="cookieVisible = true" />

  <Cookie
    v-if="isCustomized"
    v-model:cookie-visible="customizedCookieVisible"
    :cookie-classes="customizedCookieClasses"
    :cookie-data="customizedCookieData"
    :cookie-ex-days="customizedCookieExDays"
    :cookie-name="customizedCookieName"
    :cookie-position="customizedCookiePosition"
  >
    <template #header="slotProps">
      <h3 class="text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl m-0">
        {{ slotProps.title }}
      </h3>
    </template>
    <template #default="slotProps">
      <p class="text-sm sm:text-sm md:text-md lg:text-base m-0">
        {{ slotProps.description }}
      </p>
    </template>
    <template #footer="slotProps">
      <div class="grid grid-nogutter justify-content-between">
        <div
          v-for="item in slotProps.data.toggleButtonData"
          :key="item.id"
          class="grid grid-nogutter flex-column justify-content-center align-items-center col-12 md:col-3 p-1"
        >
          <p
            class="text-sm sm:text-sm md:text-md lg:text-base text-center mt-0"
          >
            {{ item.title }}
          </p>
          <Checkbox
            :binary="true"
            :disabled="!item.optional"
            :model-value="item.isToggled"
            @change="toggleCookie(item.id, !item.isToggled)"
          />
        </div>
        <div
          class="grid grid-nogutter flex-column justify-content-center align-items-stretch col-12 md:col-3"
        >
          <div
            v-for="item in slotProps.data.buttonData.filter(
              (element) => element.isVisible
            )"
            :key="item.id"
            class="flex flex-column justify-content-center align-items-stretch p-1"
          >
            <Button
              :label="item.title"
              class="text-sm sm:text-sm md:text-md lg:text-base mr-0"
              @click="clickCookie(item.action)"
            />
          </div>
        </div>
      </div>
    </template>
  </Cookie>
  <Cookie v-else v-model:cookie-visible="cookieVisible" />
</template>

<style lang="scss" scoped></style>
