<script lang="ts" setup>
import type { Ref } from 'vue';
import { onUpdated, ref } from 'vue';
import type { CookieData } from '../../mixins/types';
import { checkCookie } from '../../mixins/cookie';

// Declarations
const props = defineProps({
  visible: Boolean,
  cookieData: Object,
});
const emits = defineEmits([
  'update:visible',
  'onToggleCookie',
  'onClickCookie',
]);

const visible: Ref<boolean> = ref(checkCookie() || props.visible);
const data: Ref<CookieData> = ref(props.cookieData) as Ref<CookieData>;

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

const closeCookie = () => {
  emits('update:visible', false);

  visible.value = false;
};

// Lifecycle hooks
onUpdated(() => {
  if (props.visible) {
    visible.value = props.visible;
  }
});
</script>

<template>
  <Dialog
    v-if="visible"
    v-model:visible="visible"
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
        {{ data.title }}
      </h3>
    </template>
    <template #default>
      <p class="p-2">
        {{ data.description }}
      </p>
    </template>
    <template #footer>
      <div class="flex justify-content-between align-items-end p-1">
        <div
          v-for="item in data.toggleButtonData"
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
        <div class="flex flex-column justify-content-center align-items-start">
          <div v-for="item in data.buttonData" :key="item.id" class="p-1">
            <Button
              v-if="!item.isToggled"
              :label="item.title"
              @click="clickCookie(item.action)"
            />
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style lang="scss" scoped></style>
