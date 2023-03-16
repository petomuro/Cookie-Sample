export interface CookieToggleButtonData {
  id: number;
  name: string;
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

export type CookiePosition =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'topleft'
  | 'topright'
  | 'bottomleft'
  | 'bottomright'
  | undefined;
