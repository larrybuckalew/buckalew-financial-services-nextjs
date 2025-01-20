import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';
import prisma from '../../lib/prisma';

// Error reporting schema
const ErrorReportSchema = z.object({
  message: z.string(),
  stack: z.string().optional(),
  context: z.record(z.unknown()).optional(),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  component: z.string().optional()
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Allow anonymous error reporting, but log user if authenticated
  const session = await getServerSession(req, res, authOptions);

  try {
    if (req.method === 'POST') {
      // Validate incoming error report
      const validatedReport = ErrorReportSchema.parse(req.body);

      // Create error log in database
      const errorLog = await prisma.errorLog.create({
        data: {
          message: validatedReport.message,
          stack: validatedReport.stack,
          context: JSON.stringify(validatedReport.context || {}),
          severity: validatedReport.severity,
          component: validatedReport.component,
          userId: session?.user?.id // Optional user association
        }
      });

      // Additional error tracking logic
      // In production, you might integrate with external error tracking services
      console.error('Error Logged:', {
        id: errorLog.id,
        message: validatedReport.message,
        severity: validatedReport.severity
      });

      return res.status(200).json({
        status: 'success',
        message: 'Error report received',
        errorLogId: errorLog.id
      });
    } else {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error Report Submission Failed:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid error report format',
        details: error.errors
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Failed to submit error report'
    });
  }
}