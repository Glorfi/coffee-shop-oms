import express from 'express';
import http from 'http';
import { router } from './routes/index.js';
import { errors } from 'celebrate';
import cors from 'cors';
import { Server } from 'socket.io';
import initializeSocket from './socket/socketManager.js';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('The server is up and running!');
});
app.use('/api', router); // тут позже добавить env
app.use(errors());
app.use((err: any, req: any, res: any, next: any) => {
  if (err.statusCode) {
    res
      .status(err.statusCode)
      .json({ message: err.message, code: err.statusCode });
  } else {
    res.status(500).json(err);
  }
  next(err);
});
initializeSocket(server);

server.listen(4000, () => {
  console.log('Server is running at http://localhost:4000');
});
// app.listen({ port: 4000 }, () => {
//   console.log(`Server is running at http://localhost:4000`);
// });

export default app;
