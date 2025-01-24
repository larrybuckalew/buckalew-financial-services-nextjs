import * as fs from 'fs';
import * as path from 'path';

export function handleClientError(error: Error) {
  const logEntry = JSON.stringify({
    message: error.message,
    stack: error.stack,
    location: typeof window !== 'undefined' ? window.location.href : 'Server',
    timestamp: new Date().toISOString()
  }, null, 2);

  const logDir = path.join(process.cwd(), 'logs');
  
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const logFile = path.join(logDir, 'client-errors.log');
  
  fs.appendFile(logFile, logEntry + '\n', (err) => {
    if (err) {
      console.error('Failed to write client error to log file', err);
    }
  });
}

export function handleApiError(error: any) {
  console.error("API Error: ", error);
}

