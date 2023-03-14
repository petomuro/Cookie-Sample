<script lang="ts" setup>
import Cookie from './components/cookie/Cookie.vue';
import type { Ref } from 'vue';
import { computed, ref } from 'vue';
import type { CookieData, } from './mixins/types';
import { setCookies } from './mixins/cookies';

const cookieData: Ref<CookieData> = ref({
  title: 'Cookies',
  description:
      'Naše stránky používajú na poskytovanie služieb, analýzu návštevnosti a prispôsobenie vybraných informácií súbory cookie. Niektoré cookies môžeme používať len s vaším súhlasom. Kliknutím na položku „Povoliť všetko“ vyjadríte súhlas s prijatím všetkých kategórií cookies. Svoje nastavenia cookies môžete kedykoľvek meniť prostredníctvom nastavení na našich stránkach.',
  toggleButtonData: {
    necessaryCookies: {
      title: 'Potrebné cookies',
      isToggled: true,
      disabled: true,
      handler: () => toggleNecessaryCookies(!cookieData.value.toggleButtonData.necessaryCookies.isToggled)
    },
    personalizationCookies: {
      title: 'Personalizačné cookies',
      isToggled: false,
      disabled: false,
      handler: () => togglePersonalizationCookies(!cookieData.value.toggleButtonData.personalizationCookies.isToggled)
    },
    analyticCookies: {
      title: 'Analytické cookies',
      isToggled: false,
      disabled: false,
      handler: () => toggleAnalyticCookies(!cookieData.value.toggleButtonData.analyticCookies.isToggled),
    },
  },
  buttonData: {
    accept: {
      text: 'Povoliť všetko',
      handler: () => acceptCookies(),
    },
    acceptChosenOrDecline: {
      text: computed(() => isCookiesToggled() ? 'Odmietnuť' : 'Povoliť výber'),
      handler: () => acceptChosenOrDeclineCookies(),
    },
  }
});

const toggleNecessaryCookies = (value: boolean) => {
  cookieData.value.toggleButtonData.necessaryCookies.isToggled = value;
};

const togglePersonalizationCookies = (value: boolean) => {
  cookieData.value.toggleButtonData.personalizationCookies.isToggled = value;
};

const toggleAnalyticCookies = (value: boolean) => {
  cookieData.value.toggleButtonData.analyticCookies.isToggled = value;
};

const isCookiesToggled = (): boolean => {
  return !cookieData.value.toggleButtonData.personalizationCookies.isToggled && !cookieData.value.toggleButtonData.analyticCookies.isToggled;
};

const acceptCookies = () => {
  toggleNecessaryCookies(true);
  togglePersonalizationCookies(true);
  toggleAnalyticCookies(true);
  setCookies('cookies', cookieData.value.toggleButtonData, 10);
};

const acceptChosenOrDeclineCookies = () => {
  if (isCookiesToggled()) {
    toggleNecessaryCookies(true);
    togglePersonalizationCookies(false);
    toggleAnalyticCookies(false);
  }

  setCookies('cookies', cookieData.value.toggleButtonData, 10);
};
</script>

<template>
  <Cookie :cookie-data="cookieData"/>
</template>

<style lang="scss" scoped></style>
