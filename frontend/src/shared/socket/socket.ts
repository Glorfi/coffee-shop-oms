import { io } from 'socket.io-client';
const isProduction = process.env.NODE_ENV === 'production';
// "undefined" means the URL will be computed from the `window.location` object
const host = window.location.hostname;
const URL_LOCALNETWORK = 'http://192.168.43.59:4000';
const URL_LOCALHOST = 'http://localhost:4000';

function handleURL() {
  if (host === '192.168.43.59') {
    return 'http://192.168.43.59:4000';
  }
  return 'http://localhost:4000';
}

export const socketInstance = io(isProduction ? process.env.VITE_SOCKET_LINK || handleURL() : handleURL(), {
  // extraHeaders: {
  //   'Access-Control-Allow-Credentials': 'true',
  // },
});
