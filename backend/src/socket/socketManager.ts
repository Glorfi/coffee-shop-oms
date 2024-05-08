import { Server } from 'socket.io';
import http from 'http';

export default function initializeSocket(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: '*', // Укажите здесь список разрешенных доменов, если возможно
      methods: ['GET', 'POST'], // Укажите здесь список разрешенных HTTP-методов
    },
  });

  io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });

    // Здесь вы можете добавить обработчики других событий, если это необходимо
  });

  return io;
}
