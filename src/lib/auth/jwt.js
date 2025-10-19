// Stub JWT auth module
export function generateToken(payload) {
    return 'stub-token';
}
export function verifyToken(token) {
    return { valid: true, payload: {} };
}
export function decodeToken(token) {
    return { payload: {} };
}
