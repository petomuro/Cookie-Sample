<script lang="ts" setup>
import type { PropType, Ref } from 'vue';
import { onUpdated, ref } from 'vue';
import type { CookieData, CookiePosition } from '../../mixins/types';
import { checkCookie, setCookie } from '../../mixins/cookie';
import { findIndexById } from '../../mixins/utils';
import sampleData from '../../assets/sampleData.json';

// Declarations
const props = defineProps({
  cookieClasses: {
    type: String,
    default: 'w-auto lg:w-9 xl:w-7',
  },
  cookieData: {
    type: Object as PropType<CookieData>,
    default: sampleData,
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
  cookieVisible: {
    type: Boolean,
    default: false,
    required: true,
  },
});
const emits = defineEmits(['update:cookieVisible']);
const name: Ref<string> = ref(props.cookieName);
const classes: Ref<string> = ref(props.cookieClasses);
const data: Ref<CookieData> = ref(props.cookieData);
const exDays: Ref<number> = ref(props.cookieExDays);
const position: Ref<CookiePosition> = ref(props.cookiePosition);
const visible: Ref<boolean> = ref(
  checkCookie(name.value) || props.cookieVisible
);

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

  visible.value = false;

  emits('update:cookieVisible', false);
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

const updateCookieVisible = () => {
  visible.value = props.cookieVisible;
};

// Lifecycle hooks
onUpdated(() => {
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
    :position="position"
  >
    <template #header>
      <slot :title="data.title" name="header">
        <h3 class="text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl m-0">
          {{ data.title }}
        </h3>
      </slot>
    </template>
    <template #default>
      <slot :description="data.description">
        <p class="text-sm sm:text-sm md:text-md lg:text-base m-0">
          {{ data.description }}
        </p>
      </slot>
    </template>
    <template #footer>
      <slot :data="data" name="footer">
        <div class="grid grid-nogutter justify-content-between">
          <div
            v-for="item in data.toggleButtonData"
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
              @change="toggleCookie(item.id, !item.isToggled, item.optional)"
            />
          </div>
          <div
            class="grid grid-nogutter flex-column justify-content-center align-items-stretch col-12 md:col-3"
          >
            <div
              v-for="item in data.buttonData.filter(
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
      </slot>
    </template>
  </Dialog>
</template>

<style lang="scss" scoped></style>
