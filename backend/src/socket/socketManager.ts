import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import http from 'http';
import { placeOrder, placeOrderSocket } from '../controllers/orders.js';
import { ICreateOrder } from '../interfaces/requests/ICreateOrder.js';

export default function initializeSocket(server: http.Server) {
  const isDev = process.env.NODE_ENV !== 'production';

  const io = new Server(server, {
    cors: {
      origin: [
        'http://localhost:3001',
        'https://admin.socket.io',
        'http://192.168.43.59:3001',
      ], // снести перед деплоем
      methods: ['GET', 'POST'],
      credentials: true, // снести перед деплоем
    },
  });

  io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });

    socket.on('joinAdminRoom', () => {
      socket.join('adminRoom');
      console.log(`User ${socket.id} joined adminRoom`);
    });

    socket.on('joinOrderRoom', (orderId) => {
      socket.join(`OrderRoom_${orderId}`);
      console.log(`User ${socket.id} joined "OrderRoom:${orderId}"`);
    });

    socket.on('placeOrder', (orderData) => {
      const res = (data: any) => {
        io.to('adminRoom').emit('createdOrders', data);
        socket.emit(`placeOrderSuccess`, data);
        socket.join(`OrderRoom_${data._id}`);
        console.log(`User ${socket.id} created Order ${data._id}`);
        console.log(`User ${socket.id} joined "OrderRoom:${data._id}"`);
      };
      const next = (err: any) => socket.emit('placeOrderError', err);
      placeOrderSocket(orderData, res, next);
    });
  });
  instrument(io, { auth: false });
  return io;
}
