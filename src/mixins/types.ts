export interface CookiesToggleButtonData {
  id: number;
  title: string;
  isToggled: boolean;
  disabled: boolean;
  optional: boolean;
}

export interface CookiesButtonData {
  id: number;
  title: string;
  isToggled: boolean;
  action: string;
}

export interface CookieData {
  title: string;
  description: string;
  toggleButtonData: CookiesToggleButtonData[];
  buttonData: CookiesButtonData[];
}
