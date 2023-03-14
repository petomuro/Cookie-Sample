export interface CookiesToggleButtonData {
  necessaryCookies: {
    title: string;
    isToggled: boolean;
    disabled: boolean;
    handler: () => void;
  };
  personalizationCookies: {
    title: string;
    isToggled: boolean;
    disabled: boolean;
    handler: () => void;
  };
  analyticCookies: {
    title: string;
    isToggled: boolean;
    disabled: boolean;
    handler: () => void;
  };
}

export interface CookiesButtonData {
  accept: {
    text: string;
    handler: () => void;
  };
  acceptChosenOrDecline: {
    text: string;
    handler: () => void;
  };
}

export interface CookieData {
  title: string;
  description: string;
  toggleButtonData: CookiesToggleButtonData;
  buttonData: CookiesButtonData;
}
