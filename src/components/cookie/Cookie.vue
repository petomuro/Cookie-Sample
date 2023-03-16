<script lang="ts" setup>
import type { PropType, Ref } from 'vue';
import { onUpdated, ref } from 'vue';
import type { CookieData, CookiePosition } from '../../mixins/types';
import { checkCookie, setCookie } from '../../mixins/cookie';
import { findIndexById } from '../../mixins/utils';
import sampleData from '../../assets/sampleData.json';

// Declarations
const props = defineProps({
  cookieData: {
    type: Object as PropType<CookieData>,
    default: sampleData,
  },
  cookieClasses: {
    type: String,
    default: 'w-auto lg:w-9 xl:w-7',
  },
  cookieExDays: {
    type: Number,
    default: 10,
  },
  cookieName: {
    type: String,
    default: 'COOKIE_AGREEMENT',
  },
  cookiePosition: {
    type: String as PropType<CookiePosition>,
    default: 'bottom',
  },
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
});
const emits = defineEmits(['update:visible']);
const name: Ref<string> = ref(props.cookieName);
const classes: Ref<string> = ref(props.cookieClasses);
const data: Ref<CookieData> = ref(props.cookieData);
const exDays: Ref<number> = ref(props.cookieExDays);
const position: Ref<CookiePosition> = ref(props.cookiePosition);
const visible: Ref<boolean> = ref(checkCookie(name.value) || props.visible);

// Functions
const clickCookie = (action: string) => {
  data.value.toggleButtonData.forEach((item) => {
    const itemIndex = findIndexById(data.value.toggleButtonData, item.id);

    if (itemIndex > 0) {
      if (action === 'accept') {
        toggleCookie(item.id, true, item.optional);
      } else if (action === 'decline') {
        toggleCookie(item.id, false, item.optional);
      }
    }
  });

  storeCookie();

  emits('update:visible', false);
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
  const names = data.value.toggleButtonData.map((item) =>
    item.isToggled ? item.name : undefined
  );
  const filteredNames = names.filter((item) => item !== undefined);
  const concatNames = filteredNames.join('_');

  setCookie(name.value, concatNames, exDays.value);
};

const toggleCookie = (id: number, isToggled: boolean, optional: boolean) => {
  const itemIndex = findIndexById(data.value.toggleButtonData, id);

  data.value.toggleButtonData[itemIndex].isToggled = isToggled;

  if (optional) {
    const { secondItemIndex, thirdItemIndex, isToggled } = isCookieToggled();

    if (isToggled) {
      data.value.buttonData[secondItemIndex].isVisible = false;
      data.value.buttonData[thirdItemIndex].isVisible = true;
    } else {
      data.value.buttonData[secondItemIndex].isVisible = true;
      data.value.buttonData[thirdItemIndex].isVisible = false;
    }
  }
};

const updateCookieClasses = () => {
  classes.value = props.cookieClasses;
};

const updateCookieData = () => {
  data.value = props.cookieData;
};

const updateCookieExDays = () => {
  exDays.value = props.cookieExDays;
};

const updateCookieName = () => {
  name.value = props.cookieName;
};

const updateCookiePosition = () => {
  position.value = props.cookiePosition;
};

const updateCookieVisible = () => {
  visible.value = props.visible;
};

// Lifecycle hooks
onUpdated(() => {
  updateCookieClasses();
  updateCookieData();
  updateCookieName();
  updateCookieExDays();
  updateCookiePosition();
  updateCookieVisible();
});
</script>

<template>
  <Dialog
      v-model:visible="visible"
      :class="classes"
      :closable="false"
      :close-icon="undefined"
      :close-on-escape="false"
      :draggable="false"
      :modal="true"
      :position="position"
  >
    <template #header>
      <slot :title="data.title" name="header">
        <h3 class="p-2">{{ data.title }}</h3>
      </slot>
    </template>
    <template #default>
      <slot :description="data.description">
        <p class="p-2">{{ data.description }}</p>
      </slot>
    </template>
    <template #footer>
      <slot :data="data" name="footer">
        <div class="flex justify-content-between align-items-end p-1">
          <div
              v-for="item in data.toggleButtonData"
              :key="item.id"
              class="flex flex-column justify-content-center align-items-center p-1"
          >
            <p class="text-center">{{ item.title }}</p>
            <ToggleButton
                :disabled="!item.optional"
                :model-value="item.isToggled"
                off-label="Nie"
                on-label="Áno"
                @change="toggleCookie(item.id, !item.isToggled, item.optional)"
            />
          </div>
          <div
              class="flex flex-column justify-content-center align-items-start"
          >
            <div v-for="item in data.buttonData" :key="item.id" class="p-1">
              <Button
                  v-if="item.isVisible"
                  :label="item.title"
                  @click="clickCookie(item.action)"
              />
            </div>
          </div>
        </div>
      </slot>
    </template>
  </Dialog>
</template>

<style lang="scss" scoped></style>
