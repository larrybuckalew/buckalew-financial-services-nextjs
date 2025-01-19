import { Server } from 'ws';
import { parse } from 'url';
import { verify } from 'jsonwebtoken';
import { metrics } from '../monitoring/metrics';

interface WebSocketMessage {
  type: string;
  payload: any;
}

class WebSocketServer {
  private wss: Server;
  private clients: Map<string, WebSocket>;

  constructor() {
    this.wss = new Server({ noServer: true });
    this.clients = new Map();
    this.setupHandlers();
  }

  private setupHandlers() {
    this.wss.on('connection', (ws, userId: string) => {
      this.clients.set(userId, ws);
      metrics.increment('websocket_connection', { userId });

      ws.on('message', (data: string) => {
        try {
          const message = JSON.parse(data) as WebSocketMessage;
          this.handleMessage(userId, message);
        } catch (error) {
          console.error('Invalid WebSocket message:', error);
        }
      });

      ws.on('close', () => {
        this.clients.delete(userId);
        metrics.increment('websocket_disconnection', { userId });
      });
    });
  }

  private handleMessage(userId: string, message: WebSocketMessage) {
    metrics.increment('websocket_message', { 
      type: message.type,
      userId 
    });

    switch (message.type) {
      case 'PING':
        this.sendToUser(userId, { type: 'PONG', payload: null });
        break;
      // Add more message handlers here
    }
  }

  public handleUpgrade(req: any, socket: any, head: any) {
    const { query } = parse(req.url, true);
    const token = query.token as string;

    if (!token) {
      socket.destroy();
      return;
    }

    try {
      const payload = verify(token, process.env.JWT_SECRET!);
      const userId = payload.sub as string;

      this.wss.handleUpgrade(req, socket, head, (ws) => {
        this.wss.emit('connection', ws, userId);
      });
    } catch (error) {
      socket.destroy();
    }
  }

  public sendToUser(userId: string, message: WebSocketMessage) {
    const client = this.clients.get(userId);
    if (client?.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
      metrics.increment('websocket_message_sent', {
        type: message.type,
        userId
      });
    }
  }

  public broadcast(message: WebSocketMessage, excludeUser?: string) {
    this.clients.forEach((client, userId) => {
      if (userId !== excludeUser && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
    metrics.increment('websocket_broadcast', { type: message.type });
  }
}

export const wsServer = new WebSocketServer();