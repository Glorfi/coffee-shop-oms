import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import http from 'http';

import { handleAdminRoom } from './socket-listeners/AdminRoomListener.js';
import { handleOrderRoom } from './socket-listeners/OrderRoomListener.js';
import { handlePlaceOrder } from './socket-listeners/PlaceOrderListener.js';
import { handleUpdateOrderStatus } from './socket-listeners/UpdateOrderStatusListener.js';

export default function initializeSocket(server: http.Server) {
  const isDev = process.env.NODE_ENV !== 'production';

  const io = new Server(server, {
    cors: {
      origin: [
        'http://localhost:3001',
        'https://admin.socket.io',
        'http://192.168.43.59:3001',
        'https://coffee-shop-oms-17dd.onrender.com/'
      ],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });

    socket.on('joinAdminRoom', () => {
      handleAdminRoom(socket);
    });

    socket.on('joinOrderRoom', (orderId) => {
      handleOrderRoom(socket, orderId);
    });

    socket.on('placeOrder', handlePlaceOrder(socket, io));

    socket.on('updateOrderStatus', handleUpdateOrderStatus(socket, io));
  });

  instrument(io, { auth: false });
  return io;
}
