import type { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';
import * as path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const errorLog = JSON.parse(req.body);
    const logDir = path.join(process.cwd(), 'logs');
    
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    const logFilePath = path.join(logDir, 'api-errors.log');

    fs.appendFile(
      logFilePath, 
      ${new Date().toISOString()} - \n, 
      (err) => {
        if (err) {
          console.error('Failed to log error', err);
          res.status(500).json({ error: 'Logging failed' });
        } else {
          res.status(200).json({ message: 'Error logged' });
        }
      }
    );
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
