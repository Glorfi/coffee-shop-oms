import { Socket } from 'socket.io';

export function handleOrderRoom(socket: Socket, orderId: string) {
  socket.join(`OrderRoom_${orderId}`);
  console.log(`User ${socket.id} joined "OrderRoom:${orderId}"`);
}
