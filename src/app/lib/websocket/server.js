import { Server } from 'ws';
import { parse } from 'url';
import { verify } from 'jsonwebtoken';
import { metrics } from '../monitoring/metrics';
class WebSocketServer {
    constructor() {
        this.wss = new Server({ noServer: true });
        this.clients = new Map();
        this.setupHandlers();
    }
    setupHandlers() {
        this.wss.on('connection', (ws, userId) => {
            this.clients.set(userId, ws);
            metrics.increment('websocket_connection', { userId });
            ws.on('message', (data) => {
                try {
                    const message = JSON.parse(data);
                    this.handleMessage(userId, message);
                }
                catch (error) {
                    console.error('Invalid WebSocket message:', error);
                }
            });
            ws.on('close', () => {
                this.clients.delete(userId);
                metrics.increment('websocket_disconnection', { userId });
            });
        });
    }
    handleMessage(userId, message) {
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
    handleUpgrade(req, socket, head) {
        const { query } = parse(req.url, true);
        const token = query.token;
        if (!token) {
            socket.destroy();
            return;
        }
        try {
            const payload = verify(token, process.env.JWT_SECRET);
            const userId = payload.sub;
            this.wss.handleUpgrade(req, socket, head, (ws) => {
                this.wss.emit('connection', ws, userId);
            });
        }
        catch (error) {
            socket.destroy();
        }
    }
    sendToUser(userId, message) {
        const client = this.clients.get(userId);
        if (client?.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
            metrics.increment('websocket_message_sent', {
                type: message.type,
                userId
            });
        }
    }
    broadcast(message, excludeUser) {
        this.clients.forEach((client, userId) => {
            if (userId !== excludeUser && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
        metrics.increment('websocket_broadcast', { type: message.type });
    }
}
export const wsServer = new WebSocketServer();
