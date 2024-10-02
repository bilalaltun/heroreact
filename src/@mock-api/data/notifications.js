import { SERVICE_URL } from 'config';
import api from '../api';

const notificationData = [
  {
    id: 1,
    img: '/img/profile/profile-3.webp',
    title: 'profile-1',
    detail: 'Masraf Girişleri Açıldı!',
    link: '#/',
  },
  {
    id: 2,
    img: '/img/profile/profile-3.webp',
    title: 'profile-2',
    detail: 'Masrafları girmek için son 2 gün!',
    link: '#/',
  },
  {
    id: 3,
    img: '/img/profile/profile-3.webp',
    title: 'profile-3',
    detail: '4 masrafınız onaylandı!',
    link: '#/',
  },
];
api.onGet(`${SERVICE_URL}/notifications`).reply(200, notificationData);
