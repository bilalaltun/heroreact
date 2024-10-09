import { LAYOUT, MENU_BEHAVIOUR, NAV_COLOR, MENU_PLACEMENT, RADIUS, THEME_COLOR, USER_ROLE } from 'constants.js';
import Cookies from 'js-cookie';

export const IS_DEMO = true;
export const IS_AUTH_GUARD_ACTIVE = true;
export const SERVICE_URL = '/app';
export const USE_MULTI_LANGUAGE = true;

export const REACT_HELMET_PROPS = {
  defaultTitle: 'HeroHRM',
  titleTemplate: '%s | HeroHRM',
};

export const DEFAULT_PATHS = {
  APP: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  USER_WELCOME: '/dashboards/default',
  NOTFOUND: '/page-not-found',
  UNAUTHORIZED: '/unauthorized',
  INVALID_ACCESS: '/invalid-access',
};

// Çerezden fullName değerini al
const fullName = Cookies.get('fullName');

export const DEFAULT_SETTINGS = {
  MENU_PLACEMENT: MENU_PLACEMENT.Horizontal,
  MENU_BEHAVIOUR: MENU_BEHAVIOUR.Pinned,
  LAYOUT: LAYOUT.Fluid,
  RADIUS: RADIUS.Rounded,
  COLOR: THEME_COLOR.LightBlue,
  NAV_COLOR: NAV_COLOR.Default,
  USE_SIDEBAR: false,
};

export const DEFAULT_USER = {
  id: 1,
  name: fullName || 'fullName', // Eğer çerezdeki isim yoksa, 'Super Admin' olarak ayarlanır
  thumb: '/img/profile/profile-3.webp',
  role: USER_ROLE.Admin,
  email: 'admin@herohrm.com',
};

export const REDUX_PERSIST_KEY = 'classic-dashboard';
