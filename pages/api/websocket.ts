import { Server } from 'ws';
import { Server as HttpServer } from 'http';
import { authenticateUser } from '@/lib/auth';

export default function websocketHandler(server: HttpServer) {
  const wss = new Server({ server });

  wss.on('connection', async (ws, req) => {
    const token = req.url?.split('token=')[1];
    if (!token) {
      ws.close();
      return;
    }

    try {
      const user = await authenticateUser({ headers: { authorization: `Bearer ${token}` } } as any, {} as any);
      if (!user) {
        ws.close();
        return;
      }

      ws.on('message', (message) => {
        // Handle incoming messages if needed
      });

      ws.on('close', () => {
        // Clean up
      });
    } catch (error) {
      ws.close();
    }
  });
}