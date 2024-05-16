import { Socket } from 'socket.io';

export function handleAdminRoom(socket: Socket) {
  socket.join('adminRoom');
  console.log(`User ${socket.id} joined adminRoom`);
}
