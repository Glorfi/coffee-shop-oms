const { hostname } = window.location;
const isProduction = process.env.NODE_ENV === 'production';

export const API_PATH = {
  //  BASE: 'http://localhost:4000/api',
  // 'https://coffee-shop-oms.onrender.com/api',
  BASE:
    hostname === 'localhost'
      ? 'http://localhost:4000/api'
      : process.env.BACKEND_LINK,
  CATEGORIES: '/categories',
  DRINKS: '/drinks',
  ORDERS: '/orders',
  ORDERS_TODAY: '/orders/today',
};
