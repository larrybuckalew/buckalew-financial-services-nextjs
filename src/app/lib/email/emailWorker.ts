import { emailQueue } from './emailQueue';
import { emailService } from './emailService';
import logger from '../logging/logger';

export class EmailWorker {
  private isProcessing: boolean = false;
  private processingInterval: NodeJS.Timeout | null = null;

  async start(interval: number = 5000): Promise<void> {
    if (this.processingInterval) {
      return;
    }

    this.processingInterval = setInterval(
      () => this.processQueue(),
      interval
    );

    logger.info('Email worker started');
  }

  stop(): void {
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
      this.processingInterval = null;
      logger.info('Email worker stopped');
    }
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing) {
      return;
    }

    this.isProcessing = true;

    try {
      const email = await emailQueue.getNextPendingEmail();
      
      if (email) {
        logger.info(`Processing email ${email.id}`);
        
        try {
          await emailService.sendEmail({
            to: email.to,
            subject: email.subject,
            templateName: email.templateName,
            data: email.data
          });

          await emailQueue.updateEmailStatus(email.id, 'completed');
          logger.info(`Successfully sent email ${email.id}`);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          logger.error(`Failed to send email ${email.id}: ${errorMessage}`);
          await emailQueue.updateEmailStatus(email.id, 'failed', errorMessage);
        }
      }

      // Clean up old completed emails periodically
      if (Math.random() < 0.1) { // 10% chance on each run
        await emailQueue.cleanupCompletedEmails();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Error in email worker: ${errorMessage}`);
    } finally {
      this.isProcessing = false;
    }
  }
}

export const emailWorker = new EmailWorker();