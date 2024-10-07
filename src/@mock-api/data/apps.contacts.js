import { SERVICE_URL } from 'config';
import api from '../api';

const contactsAppData = [
  {
    id: 1,
    name: 'Murat Yenisen',
    position: 'Manager',
    email: 'murat.yenisen@aifteam.com',
    phone: '+905446187708',
    group: 'Admin',
    thumb: '/img/profile/profile-3.webp',
  },
];
api.onGet(`${SERVICE_URL}/apps/contacts`).reply((config) => {
  const { term, sortBy, pageSize, pageIndex } = config.params;

  let dataList = [...contactsAppData];

  if (term && term.length > 1) {
    dataList = contactsAppData.filter(
      (data) =>
        data.name.toLowerCase().includes(term.toLowerCase()) ||
        data.position.toLowerCase().includes(term.toLowerCase()) ||
        data.email.toLowerCase().includes(term.toLowerCase()) ||
        data.phone.toLowerCase().includes(term.toLowerCase()) ||
        data.group.toLowerCase().includes(term.toLowerCase())
    );
  }

  const data = {
    pageSize,
    pageIndex,
    pageCount: Math.ceil(dataList.length / pageSize),
    items: [],
  };

  if (Array.isArray(sortBy) && sortBy.length === 1) {
    dataList.sort((a, b) => {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < sortBy.length; ++i) {
        if (a[sortBy[i].id] > b[sortBy[i].id]) return sortBy[i].desc ? -1 : 1;
        if (a[sortBy[i].id] < b[sortBy[i].id]) return sortBy[i].desc ? 1 : -1;
      }
      return 0;
    });
  }
  const startRow = pageSize * pageIndex;
  const endRow = startRow + pageSize;
  data.items = dataList.slice(startRow, endRow);

  return [200, { ...data }];
});
api.onPost(`${SERVICE_URL}/apps/contacts`).reply((config) => {
  const requestData = JSON.parse(config.data);
  const { item, sortBy, pageSize, pageIndex } = requestData;

  const dataList = [...contactsAppData];
  // Add item
  dataList.push({ ...item, id: dataList.length + 1 });

  const data = {
    pageSize,
    pageIndex,
    pageCount: Math.ceil(dataList.length / pageSize),
    items: [],
  };

  if (Array.isArray(sortBy) && sortBy.length === 1) {
    dataList.sort((a, b) => {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < sortBy.length; ++i) {
        if (a[sortBy[i].id] > b[sortBy[i].id]) return sortBy[i].desc ? -1 : 1;
        if (a[sortBy[i].id] < b[sortBy[i].id]) return sortBy[i].desc ? 1 : -1;
      }
      return 0;
    });
  }
  const startRow = pageSize * pageIndex;
  const endRow = startRow + pageSize;
  data.items = dataList.slice(startRow, endRow);

  return [200, { ...data }];
});
api.onPut(`${SERVICE_URL}/apps/contacts`).reply((config) => {
  const requestData = JSON.parse(config.data);
  const { item, sortBy, pageSize, pageIndex } = requestData;
  let dataList = [...contactsAppData];
  // Update item
  dataList = dataList.map((x) => (x.id === item.id ? item : x));

  const data = {
    pageSize,
    pageIndex,
    pageCount: Math.ceil(dataList.length / pageSize),
    items: [],
  };

  if (Array.isArray(sortBy) && sortBy.length === 1) {
    dataList.sort((a, b) => {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < sortBy.length; ++i) {
        if (a[sortBy[i].id] > b[sortBy[i].id]) return sortBy[i].desc ? -1 : 1;
        if (a[sortBy[i].id] < b[sortBy[i].id]) return sortBy[i].desc ? 1 : -1;
      }
      return 0;
    });
  }
  const startRow = pageSize * pageIndex;
  const endRow = startRow + pageSize;
  data.items = dataList.slice(startRow, endRow);

  return [200, { ...data }];
});
api.onDelete(`${SERVICE_URL}/apps/contacts`).reply((config) => {
  const { ids, sortBy, pageSize, pageIndex } = config;

  let dataList = [...contactsAppData];
  // Delete item
  dataList = dataList.filter((x) => !ids.includes(x.id));

  const data = {
    pageSize,
    pageIndex,
    pageCount: Math.ceil(dataList.length / pageSize),
    items: [],
  };

  if (Array.isArray(sortBy) && sortBy.length === 1) {
    dataList.sort((a, b) => {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < sortBy.length; ++i) {
        if (a[sortBy[i].id] > b[sortBy[i].id]) return sortBy[i].desc ? -1 : 1;
        if (a[sortBy[i].id] < b[sortBy[i].id]) return sortBy[i].desc ? 1 : -1;
      }
      return 0;
    });
  }
  const startRow = pageSize * pageIndex;
  const endRow = startRow + pageSize;
  data.items = dataList.slice(startRow, endRow);

  return [200, { ...data }];
});
