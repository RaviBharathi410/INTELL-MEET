export class WebSocketService {
  private socket: WebSocket | null = null;

  constructor() {}

  public connect(url: string) {
    console.log('[WebSocketService] Connecting to:', url);
    // this.socket = new WebSocket(url);
  }

  public disconnect() {
    console.log('[WebSocketService] Disconnecting...');
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  public sendEvent(eventType: string, payload: any) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.warn('[WebSocketService] Cannot send event, socket not open:', eventType);
      return;
    }
    this.socket.send(JSON.stringify({ type: eventType, payload }));
  }
}

export const websocketService = new WebSocketService();
