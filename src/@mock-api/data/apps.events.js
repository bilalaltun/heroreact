import { SERVICE_URL } from 'config';
import api from '../api';

const addDaysToday = (days = 0) => {
  const result = new Date();
  result.setDate(result.getDate() + days);
  return result.toISOString().replace(/T.*$/, '');
};

let guid = 0;

const createId = () => {
  guid += 1;
  return String(guid);
};

let eventsData = [
  {
    id: createId(),
    title: 'Personel Odemeleri',
    start: addDaysToday(5),
    end: addDaysToday(7),
    color: '#ff000',
    category: 'expence',
  },
  {
    id: createId(),
    title: 'Lisans Odemeleri',
    start: addDaysToday(-11),
    end: addDaysToday(-8),
    category: 'Work',
  },
  {
    id: createId(),
    title: 'Sunucu Odemesi',
    start: `${addDaysToday(2)}T12:15:00`,
    category: 'Personal',
  },
  {
    id: createId(),
    title: 'Link',
    start: `${addDaysToday(-3)}T12:00:00`,
    category: 'Work',
  },
  {
    id: createId(),
    title: 'Otobil',
    start: `${addDaysToday()}T10:30:00`,
    end: `${addDaysToday()}T12:30:00`,
    category: 'Ulasim',
  },
];
api.onGet(`${SERVICE_URL}/apps/events`).reply(200, eventsData);
api.onPost(`${SERVICE_URL}/apps/events`).reply((config) => {
  const requestData = JSON.parse(config.data);
  const { item } = requestData;

  // Add item
  eventsData = [{ ...item, id: createId() }, ...eventsData];
  return [200, eventsData];
});
api.onPut(`${SERVICE_URL}/apps/events`).reply((config) => {
  const requestData = JSON.parse(config.data);
  const { item } = requestData;
  if (eventsData.find((x) => x.id === item.id)) {
    eventsData = eventsData.map((x) => (x.id === item.id ? item : x));
    // Update item
    return [200, eventsData];
  }
  eventsData.push({ ...item, id: createId() });
  return [200, eventsData];
});
api.onDelete(`${SERVICE_URL}/apps/events`).reply((config) => {
  const { id } = config;
  // Delete item
  eventsData = [...eventsData.filter((x) => id !== x.id)];
  return [200, eventsData];
});
