export interface CookieToggleButtonData {
  id: number;
  title: string;
  isToggled: boolean;
  optional: boolean;
}

export interface CookieButtonData {
  id: number;
  title: string;
  isVisible: boolean;
  action: string;
}

export interface CookieData {
  title: string;
  description: string;
  toggleButtonData: CookieToggleButtonData[];
  buttonData: CookieButtonData[];
}
