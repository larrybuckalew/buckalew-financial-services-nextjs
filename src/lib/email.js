// Stub email module
export function sendEmail(to, subject, body) {
    console.log('Email would be sent:', { to, subject, body });
    return Promise.resolve({ success: true });
}
