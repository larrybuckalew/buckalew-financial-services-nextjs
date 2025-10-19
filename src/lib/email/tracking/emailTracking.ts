import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export interface EmailTrackingData {
  emailId: string;
  recipientEmail: string;
  templateName: string;
  metadata?: Record<string, any>;
}

export class EmailTrackingService {
  async createTrackingId(data: EmailTrackingData): Promise<string> {
    const trackingId = uuidv4();

    await prisma.emailTracking.create({
      data: {
        trackingId,
        emailId: data.emailId,
        recipientEmail: data.recipientEmail,
        templateName: data.templateName,
        metadata: data.metadata,
        status: 'SENT',
        sentAt: new Date(),
      },
    });

    return trackingId;
  }

  async trackOpen(trackingId: string): Promise<void> {
    await prisma.emailTracking.update({
      where: { trackingId },
      data: {
        status: 'OPENED',
        openedAt: new Date(),
        openCount: {
          increment: 1
        }
      },
    });
  }

  async trackClick(trackingId: string, linkId: string): Promise<void> {
    await prisma.emailTracking.update({
      where: { trackingId },
      data: {
        clickCount: {
          increment: 1
        },
        clicks: {
          create: {
            linkId,
            clickedAt: new Date()
          }
        }
      },
    });
  }

  async getEmailAnalytics(filters: {
    startDate?: Date;
    endDate?: Date;
    templateName?: string;
  }): Promise<{
    totalSent: number;
    totalOpened: number;
    totalClicks: number;
    openRate: number;
    clickRate: number;
  }> {
    const whereClause = {
      AND: [
        filters.startDate ? { sentAt: { gte: filters.startDate } } : {},
        filters.endDate ? { sentAt: { lte: filters.endDate } } : {},
        filters.templateName ? { templateName: filters.templateName } : {},
      ],
    };

    const [totalSent, totalOpened, totalClicks] = await Promise.all([
      prisma.emailTracking.count({ where: whereClause }),
      prisma.emailTracking.count({
        where: {
          ...whereClause,
          status: 'OPENED',
        },
      }),
      prisma.emailTracking.count({
        where: {
          ...whereClause,
          clickCount: { gt: 0 },
        },
      }),
    ]);

    return {
      totalSent,
      totalOpened,
      totalClicks,
      openRate: totalSent ? (totalOpened / totalSent) * 100 : 0,
      clickRate: totalSent ? (totalClicks / totalSent) * 100 : 0,
    };
  }

  async getTemplatePerformance(): Promise<Array<{
    templateName: string;
    sentCount: number;
    openRate: number;
    clickRate: number;
  }>> {
    const templates = await prisma.emailTracking.groupBy({
      by: ['templateName'],
      _count: {
        trackingId: true,
      },
      _sum: {
        openCount: true,
        clickCount: true,
      },
    });

    return templates.map(template => ({
      templateName: template.templateName,
      sentCount: template._count.trackingId,
      openRate: template._sum.openCount 
        ? (template._sum.openCount / template._count.trackingId) * 100 
        : 0,
      clickRate: template._sum.clickCount
        ? (template._sum.clickCount / template._count.trackingId) * 100
        : 0,
    }));
  }
}

export const emailTracking = new EmailTrackingService();