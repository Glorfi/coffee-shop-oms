import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { updateOrderStatusSocket } from '../../controllers/orders.js';

export function handleUpdateOrderStatus(socket: Socket, io: Server) {
  return (orderData: any) => {
    const res = (data: any) => {
      io.to(`OrderRoom_${data._id}`).emit('updateOrderSuccess', data);
      console.log(`User ${socket.id} updated Order ${data._id}`);
    };
    const next = (err: any) => {
      socket.emit('updateOrderError', err);
      console.log(
        `User ${socket.id} failed to update Order ${orderData._id}, due to ${err}`
      );
    };
    updateOrderStatusSocket(orderData, res, next);
  };
}
