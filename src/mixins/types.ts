export interface CookieToggleButtonData {
  id: number;
  title: string;
  isToggled: boolean;
  disabled: boolean;
  optional: boolean;
}

export interface CookieButtonData {
  id: number;
  title: string;
  isToggled: boolean;
  action: string;
}

export interface CookieData {
  title: string;
  description: string;
  toggleButtonData: CookieToggleButtonData[];
  buttonData: CookieButtonData[];
}
