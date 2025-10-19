// Stub email module
export function sendEmail(to: string, subject: string, body: string) {
  console.log('Email would be sent:', { to, subject, body });
  return Promise.resolve({ success: true });
}