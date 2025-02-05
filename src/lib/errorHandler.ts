<<<<<<< HEAD
export function handleClientError(error: Error) {
  // Log error to console
  console.error('Unhandled client-side error:', error);

  // You can add additional error logging or reporting here
  try {
    // Optional: Send error to a logging service
    // window.logService.sendError(error);
  } catch (logError) {
    console.error('Error logging failed', logError);
  }
}
=======
﻿import * as fs from 'fs';
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

>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b
