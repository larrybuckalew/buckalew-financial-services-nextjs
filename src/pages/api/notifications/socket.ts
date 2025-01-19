import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '@/types/socket';
import { Server as ServerIO } from 'socket.io';
import { Server as NetServer } from 'http';
import { initSocketServer } from '@/lib/socket';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (!res.socket.server.io) {
    console.log('Initializing socket server...');
    const httpServer: NetServer = res.socket.server as any;
    const io = initSocketServer(httpServer);
    res.socket.server.io = io;
  }

  res.end();
}