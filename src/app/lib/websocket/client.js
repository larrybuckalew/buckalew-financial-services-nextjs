import { metrics } from '../monitoring/metrics';
export class WebSocketClient {
    constructor(baseUrl, getToken) {
        this.baseUrl = baseUrl;
        this.getToken = getToken;
        this.ws = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 1000;
        this.messageHandlers = new Map();
    }
    connect() {
        if (this.ws?.readyState === WebSocket.OPEN)
            return;
        const token = this.getToken();
        const url = `${this.baseUrl}?token=${token}`;
        this.ws = new WebSocket(url);
        this.ws.onopen = () => {
            metrics.increment('websocket_client_connected');
            this.reconnectAttempts = 0;
            this.startHeartbeat();
        };
        this.ws.onclose = () => {
            metrics.increment('websocket_client_disconnected');
            this.handleDisconnect();
        };
        this.ws.onmessage = (event) => {
            try {
                const { type, payload } = JSON.parse(event.data);
                this.handleMessage(type, payload);
            }
            catch (error) {
                console.error('Invalid WebSocket message:', error);
            }
        };
    }
    startHeartbeat() {
        setInterval(() => {
            if (this.ws?.readyState === WebSocket.OPEN) {
                this.send('PING');
            }
        }, 30000);
    }
    handleDisconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            setTimeout(() => this.connect(), this.reconnectDelay * this.reconnectAttempts);
        }
    }
    subscribe(type, handler) {
        const handlers = this.messageHandlers.get(type) || [];
        handlers.push(handler);
        this.messageHandlers.set(type, handlers);
        return () => {
            const handlers = this.messageHandlers.get(type) || [];
            this.messageHandlers.set(type, handlers.filter(h => h !== handler));
        };
    }
    handleMessage(type, payload) {
        const handlers = this.messageHandlers.get(type) || [];
        handlers.forEach(handler => handler(payload));
        metrics.increment('websocket_client_message_received', { type });
    }
    send(type, payload) {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ type, payload }));
            metrics.increment('websocket_client_message_sent', { type });
        }
    }
    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
}
