// Stub JWT auth module
export function generateToken(payload: any) {
  return 'stub-token';
}

export function verifyToken(token: string) {
  return { valid: true, payload: {} };
}

export function decodeToken(token: string) {
  return { payload: {} };
}

export function getTokenFromHeader(header: string | null): string | null {
  if (header && header.startsWith('Bearer ')) {
    return header.substring(7);
  }
  return null;
}
