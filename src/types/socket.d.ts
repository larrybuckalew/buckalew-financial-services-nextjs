import { Server as NetServer } from 'http';
import { Socket as NetSocket } from 'net';
import { NextApiResponse } from 'next';

export type NextApiResponseServerIO = NextApiResponse & {
  socket: NetSocket & {
    server: NetServer & {
      io: any;
    };
  };
}