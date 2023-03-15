<script lang="ts" setup>
import Cookie from './components/cookie/Cookie.vue';
// import type { Ref } from 'vue';
// import { ref } from 'vue';
// import type { CookieData } from './mixins/types';

// const data: Ref<CookieData> = ref({
//   title: 'Title',
//   description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
//   toggleButtonData: [
//     {
//       'id': 1,
//       'title': 'Cookie 1',
//       'isToggled': true,
//       'disabled': true,
//       'optional': false
//     },
//     {
//       'id': 2,
//       'title': 'Cookie 2',
//       'isToggled': false,
//       'disabled': false,
//       'optional': true
//     },
//     {
//       'id': 3,
//       'title': 'Cookie 3',
//       'isToggled': false,
//       'disabled': false,
//       'optional': true
//     }
//   ],
//   buttonData: [
//     {
//       'id': 1,
//       'title': 'Accept all',
//       'isToggled': false,
//       'action': 'accept'
//     },
//     {
//       'id': 2,
//       'title': 'Decline',
//       'isToggled': false,
//       'action': 'decline'
//     },
//     {
//       'id': 3,
//       'title': 'Accept chosen',
//       'isToggled': true,
//       'action': 'acceptChosen'
//     }
//   ]
// });
</script>

<template>
  <Cookie />

  <!--  <Cookie>-->
  <!--    <template #header>-->
  <!--      {{ data.title }}-->
  <!--    </template>-->
  <!--    <template #default>-->
  <!--      {{ data.description }}-->
  <!--    </template>-->
  <!--    <template #footer-toggle-buttons>-->
  <!--      &lt;!&ndash;      Customize based od your needs&ndash;&gt;-->
  <!--      <div-->
  <!--          v-for="item in data.toggleButtonData"-->
  <!--          :key="item.id"-->
  <!--          class="flex flex-column justify-content-center align-items-center p-1"-->
  <!--      >-->
  <!--        <p class="text-center">{{ item.title }}</p>-->
  <!--        <ToggleButton-->
  <!--            v-model="item.isToggled"-->
  <!--            :disabled="item.disabled"-->
  <!--            off-label="Nie"-->
  <!--            on-label="Áno"-->
  <!--        />-->
  <!--      </div>-->
  <!--    </template>-->
  <!--    <template #footer-buttons>-->
  <!--      <div v-for="item in data.buttonData" :key="item.id" class="p-1">-->
  <!--        <Button v-if="!item.isToggled" :label="item.title"/>-->
  <!--      </div>-->
  <!--    </template>-->
  <!--  </Cookie>-->
</template>

<style lang="scss" scoped></style>
