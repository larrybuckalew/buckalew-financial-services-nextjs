// Stub websocket module
export function broadcastToUser(userId: string, message: any) {
  console.log('Broadcasting to user:', userId, message);
}

export function broadcastToAll(message: any) {
  console.log('Broadcasting to all:', message);
}