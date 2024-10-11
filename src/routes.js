/* eslint-disable */
import { lazy } from 'react';
import { DEFAULT_PATHS } from 'config.js';
import { jwtDecode } from 'jwt-decode';

// Cookie'den role değerini almak için bir yardımcı fonksiyon ekliyoruz.
const getRoleFromCookie = () => {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('role='))
    ?.split('=')[1];
  return cookieValue || 'User'; // Varsayılan olarak 'User' döndürüyoruz.
};

const role = getRoleFromCookie();

const dashboards = {
  index: lazy(() => import('views/dashboards/Dashboards')),
  default: lazy(() => import('views/dashboards/DashboardsDefault')),
  visual: lazy(() => import('views/dashboards/DashboardsVisual')),
  analytic: lazy(() => import('views/dashboards/DashboardsAnalytic')),
};
const apps = {
  index: lazy(() => import('views/apps/Apps')),
  calendar: lazy(() => import('views/apps/calendar/Calendar')),
  chat: lazy(() => import('views/apps/chat/Chat')),
  contacts: lazy(() => import('views/apps/contacts/Contacts')),
  mailbox: lazy(() => import('views/apps/mailbox/Mailbox')),
  tasks: lazy(() => import('views/apps/tasks/Tasks')),
  company: lazy(() => import('views/apps/company/SirketEkle')),
};
const masraf = {
  index: lazy(() => import('views/masraf/Masraf')),
  masrafekle: lazy(() => import('views/masraf/MasrafEkle')),
  masraflistele: lazy(() => import('views/masraf/MasrafListele')),
  masrafdetay: lazy(() => import('views/masraf/MasrafDetay')),
};
const parametre = {
  parametreler: lazy(() => import('views/parametre/Parametreler')),
  proje: lazy(() => import('views/parametre/Proje')),
  kategoriler: lazy(() => import('views/parametre/Kategoriler')),
  kdv: lazy(() => import('views/parametre/Kdv')),
};
const pages = {
  index: lazy(() => import('views/pages/Pages')),
  authentication: {
    index: lazy(() => import('views/pages/authentication/Authentication')),
    login: lazy(() => import('views/pages/authentication/Login')),
    register: lazy(() => import('views/pages/authentication/Register')),
    forgotPassword: lazy(() => import('views/pages/authentication/ForgotPassword')),
    resetPassword: lazy(() => import('views/pages/authentication/ResetPassword')),
  },
};
const blocks = {
  index: lazy(() => import('views/blocks/Blocks')),
};
const appRoot = DEFAULT_PATHS.APP.endsWith('/')
  ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length)
  : DEFAULT_PATHS.APP;

const routesAndMenuItems = {
  mainMenuItems: [
    {
      path: DEFAULT_PATHS.APP,
      exact: true,
      redirect: true,
      to: `${appRoot}/login`,
    },
    {
      path: `${appRoot}/dashboards/analytic`,
      component: dashboards.analytic,
      label: 'Dashboard',
      icon: 'home',
    },
    // Uygulamalar bölümü sadece 'User' rolü olmayanlar için gösterilecek
    ...(role !== 'User'
      ? [
          {
            path: `${appRoot}/apps`,
            label: 'Uygulamalar',
            icon: 'screen',
            component: apps.index,
            subs: [
              role !== 'Admin' && { path: '/calendar', label: 'menu.calendar', component: apps.calendar },
              (role === 'Admin' || role === 'SuperAdmin') && {
                path: '/contacts',
                label: 'menu.contacts',
                component: apps.contacts,
              },
              role === 'SuperAdmin' && { path: '/company', label: 'Şirket Ekle', component: apps.company },
            ].filter(Boolean),
          },
        ]
      : []),
      {
        path: `${appRoot}/masraf`,
        label: 'Masraflar',
        icon: 'home-garage',
        component: masraf.index,
        subs: [
          { path: '/masrafekle', label: 'Masraf Ekle', component: masraf.masrafekle },
          { path: '/masraflistele', label: 'Masraf Listele', component: masraf.masraflistele },
          { path: '/masrafdetay', label: 'Masraf Detay', component: masraf.masrafdetay, hidden: false }, // Herkese görünür olacak şekilde ayarlandı
        ],
      },      
      (role === 'Admin' || role === 'SuperAdmin') && {
        path: `${appRoot}/parametre`,
        label: 'Parametreler',
        icon: 'home-garage',
        component: parametre.parametreler,
        subs: [
          { path: '/parametreler', label: 'Sistem Parametreleri', component: parametre.parametreler },
          { path: '/proje', label: 'Projeler', component: parametre.proje },
          { path: '/kategoriler', label: 'Kategoriler', component: parametre.kategoriler },
          { path: '/kdv', label: 'KDV Oranları', component: parametre.kdv },
        ],
      },
      
    {
      path: `${appRoot}/dashboards`,
      component: dashboards.index,
      label: 'Rapor',
      icon: 'home',
      subs: [
        { path: '/default', label: 'Masraf Raporları', component: dashboards.default },
      ],
    },
  ].filter(Boolean), // Sadece doğrulanan rotalar eklenir
  sidebarItems: [
    { path: '#connections', label: 'menu.connections', icon: 'diagram-1', hideInRoute: true },
    { path: '#bookmarks', label: 'menu.bookmarks', icon: 'bookmark', hideInRoute: true },
    { path: '#requests', label: 'menu.requests', icon: 'diagram-2', hideInRoute: true },
  ],
};

export default routesAndMenuItems;
