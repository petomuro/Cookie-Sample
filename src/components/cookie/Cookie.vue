<script lang="ts" setup>
import { ref } from 'vue';
import { checkCookies } from '../../mixins/cookies';
import type { CookieData, } from '../../mixins/types';

// Declarations
const props = defineProps<{
  cookieData: CookieData;
}>();
const emits = defineEmits(['onToggleCookies', 'onClickCookies']);
const isActive = ref(checkCookies());

// Functions
const toggleCookies = (id: number, isToggled: boolean, optional: boolean) => {
  emits('onToggleCookies', { id: id, isToggled: !isToggled, optional: optional });
};

const clickCookies = (action: string) => {
  emits('onClickCookies', action);
  closeCookies();
};

const openCookies = () => {
  isActive.value = true;
};

const closeCookies = () => {
  isActive.value = false;
};
</script>

<template>
  <Button label="Zobraziť cookies" @click="openCookies()"/>

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
              @change="toggleCookies(item.id, item.isToggled, item.optional)"
          />
        </div>
        <div class="flex flex-column justify-content-center align-items-start">
          <div
              v-for="item in props.cookieData.buttonData"
              :key="item.id"
              class="p-1"
          >
            <Button
                v-if="!item.isToggled"
                :label="item.title"
                @click="clickCookies(item.action)"
            />
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style lang="scss" scoped></style>
