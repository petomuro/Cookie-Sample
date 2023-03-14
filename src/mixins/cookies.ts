import type { CookiesToggleButtonData } from './types';

export const setCookies = (
  cName: string,
  cValue: CookiesToggleButtonData,
  exDays: number
) => {
  const d = new Date();
  d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();

  document.cookie = `${cName}=${JSON.stringify(cValue)};${expires};path=/`;
};

export const getCookies = (cName: string): string => {
  let name = cName + '=';
  let ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];

    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
};

export const checkCookies = (): boolean => {
  return getCookies('cookies') == '';
};
