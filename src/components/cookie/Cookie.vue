<script lang="ts" setup>
import { ref } from 'vue';
import { checkCookies } from '../../mixins/cookies';
import type { CookieData, } from '../../mixins/types';

const props = defineProps<{
  cookieData: CookieData;
}>();

const isActive = ref(checkCookies());

const closeCookies = () => {
  isActive.value = false;
};
</script>

<template>
  <Dialog
      v-model:visible="isActive"
      :closable="false"
      :close-icon="undefined"
      :close-on-escape="false"
      :draggable="false"
      :modal="true"
      class="w-auto lg:w-9 xl:w-7"
      position="bottom"
  >
    <template #header>
      <h3 class="p-2">{{ props.cookieData.title }}</h3>
    </template>
    <template #default>
      <p class="p-2">
        {{ props.cookieData.description }}
      </p>
    </template>
    <template #footer>
      <div class="flex justify-content-between align-items-end p-1">
        <div
            v-for="(item, index) in props.cookieData.toggleButtonData"
            :key="index"
            class="flex flex-column justify-content-center align-items-center p-1"
        >
          <p class="text-center">{{ item.title }}</p>
          <ToggleButton
              v-model="item.isToggled"
              :disabled="item.disabled"
              off-label="Nie"
              on-label="Áno"
          />
        </div>
        <div class="flex flex-column justify-content-center align-items-start">
          <div
              v-for="(item, index) in props.cookieData.buttonData"
              :key="index"
              class="p-1"
          >
            <Button
                :label="item.text"
                @click="item.handler(); closeCookies();"
            />
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style lang="scss" scoped></style>
