export const setCookie = (cName: string, cValue: string, exDays: number) => {
  const d: Date = new Date();
  d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000);
  let expires: string = 'expires=' + d.toUTCString();

  document.cookie = `${cName}=${cValue};${expires};path=/`;
};

export const getCookie = (cName: string): string => {
  const name: string = cName + '=';
  const ca: string[] = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c: string = ca[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
};

export const checkCookie = (cName: string): boolean => {
  return getCookie(cName) === '';
};
