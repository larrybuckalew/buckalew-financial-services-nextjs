import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

export function logError(error: Error, context?: any) {
  const logEntry = JSON.stringify({
    message: error.message,
    stack: error.stack,
    context: context || {},
    timestamp: new Date().toISOString()
  }, null, 2);

  const logDir = path.join(process.cwd(), 'logs');
  
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const logFile = path.join(logDir, 'error.log');
  
  fs.appendFile(logFile, logEntry + '\n', (err) => {
    if (err) {
      console.error('Failed to write to log file', err);
    }
  });
}
