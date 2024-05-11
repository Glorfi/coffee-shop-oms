const { hostname } = window.location;

export const API_PATH = {
  //  BASE: 'http://localhost:4000/api',
  BASE:
    hostname === 'localhost'
      ? 'http://localhost:4000/api'
      : 'http://192.168.43.59:4000/api',
  CATEGORIES: '/categories',
  DRINKS: '/drinks',
  ORDERS: '/orders',
};
