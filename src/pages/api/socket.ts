import { Server as HttpServer } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server as IOServer } from 'socket.io';

let io: IOServer;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!io) {
    if (!res.socket) {
      res.status(500).send('Socket not found');
      return;
    }
    const httpServer: HttpServer = (res.socket as any).server;
    io = new IOServer(httpServer, {
      path: '/api/socket',
    });

    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('message', (message) => {
        io.emit('message', message);
      });

      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });

    (res.socket as any).server.io = io;
  }

  res.end();
}