<script lang="ts" setup>
import { ref } from 'vue';
import { checkCookie } from '../../mixins/cookie';
import type { CookieData } from '../../mixins/types';

// Declarations
const props = defineProps<{
  cookieData: CookieData;
}>();
const emits = defineEmits(['onToggleCookie', 'onClickCookie']);
const isActive = ref(checkCookie());

// Functions
const toggleCookie = (id: number, isToggled: boolean, optional: boolean) => {
  emits('onToggleCookie', {
    id: id,
    isToggled: !isToggled,
    optional: optional,
  });
};

const clickCookie = (action: string) => {
  emits('onClickCookie', action);
  closeCookie();
};

const openCookie = () => {
  isActive.value = true;
};

const closeCookie = () => {
  isActive.value = false;
};
</script>

<template>
  <Button label="Zobraziť cookie" @click="openCookie()" />

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
      <h3 class="p-2">
        <slot name="header">{{ props.cookieData.title }}</slot>
      </h3>
    </template>
    <template #default>
      <p class="p-2">
        <slot>
          {{ props.cookieData.description }}
        </slot>
      </p>
    </template>
    <template #footer>
      <div class="flex justify-content-between align-items-end p-1">
        <slot name="footer-toggle-buttons">
          <div
            v-for="item in props.cookieData.toggleButtonData"
            :key="item.id"
            class="flex flex-column justify-content-center align-items-center p-1"
          >
            <p class="text-center">{{ item.title }}</p>
            <ToggleButton
              :disabled="item.disabled"
              :model-value="item.isToggled"
              off-label="Nie"
              on-label="Áno"
              @change="toggleCookie(item.id, item.isToggled, item.optional)"
            />
          </div>
        </slot>
        <div class="flex flex-column justify-content-center align-items-start">
          <slot name="footer-buttons">
            <div
              v-for="item in props.cookieData.buttonData"
              :key="item.id"
              class="p-1"
            >
              <Button
                v-if="!item.isToggled"
                :label="item.title"
                @click="clickCookie(item.action)"
              />
            </div>
          </slot>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style lang="scss" scoped></style>
