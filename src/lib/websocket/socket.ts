import { io, Socket } from 'socket.io-client';

class WebSocketService {
  private socket: Socket | null = null;
  private subscriptions: Map<string, ((data: any) => void)[]> = new Map();

  connect() {
    if (!this.socket) {
      this.socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:3001');

      this.socket.on('connect', () => {
        console.log('WebSocket connected');
      });

      this.socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
      });

      // Handle different event types
      ['data-update', 'report-generated', 'import-complete'].forEach(eventType => {
        this.socket.on(eventType, (data) => {
          const handlers = this.subscriptions.get(eventType);
          if (handlers) {
            handlers.forEach(handler => handler(data));
          }
        });
      });
    }
  }

  subscribe(eventType: string, handler: (data: any) => void) {
    if (!this.subscriptions.has(eventType)) {
      this.subscriptions.set(eventType, []);
    }
    this.subscriptions.get(eventType)?.push(handler);
  }

  unsubscribe(eventType: string, handler: (data: any) => void) {
    const handlers = this.subscriptions.get(eventType);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  emit(eventType: string, data: any) {
    if (this.socket) {
      this.socket.emit(eventType, data);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const webSocketService = new WebSocketService();
