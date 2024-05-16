import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { placeOrderSocket } from '../../controllers/orders.js';


export function handlePlaceOrder(socket: Socket, io: Server) {
  return (orderData: any) => {
    const res = (data: any) => {
      io.to('adminRoom').emit('createdOrders', data);
      socket.emit(`placeOrderSuccess`, data);
      socket.join(`OrderRoom_${data._id}`);
      console.log(`User ${socket.id} created Order ${data._id}`);
      console.log(`User ${socket.id} joined "OrderRoom_${data._id}"`);
    };
    const next = (err: any) => socket.emit('placeOrderError', err);
    placeOrderSocket(orderData, res, next);
  };
}
