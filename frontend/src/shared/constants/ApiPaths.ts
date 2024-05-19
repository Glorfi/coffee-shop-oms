const { hostname } = window.location;
const isProduction = process.env.NODE_ENV === 'production';
const prodLink = import.meta.env.VITE_BACKEND_LINK;

export const API_PATH = {
  //  BASE: 'http://localhost:4000/api',
  // 'https://coffee-shop-oms.onrender.com/api',
  BASE: isProduction ? prodLink : `http://${hostname}:4000/api`,
  CATEGORIES: '/categories',
  DRINKS: '/drinks',
  ORDERS: '/orders',
  ORDERS_TODAY: '/orders/today',
};
