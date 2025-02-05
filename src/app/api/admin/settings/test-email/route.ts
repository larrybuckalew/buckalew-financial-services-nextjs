import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';
import { hasPermission } from '@/lib/rbac';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    // Verify admin access
    const token = getTokenFromHeader(request.headers.get('Authorization'));
    const payload = await verifyToken(token);
    
    const admin = await prisma.user.findUnique({
      where: { id: payload.sub },
      include: { role: true }
    });

    if (!admin || !hasPermission(admin, 'manage_settings')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const emailSettings = await request.json();

    // Send test email
    await sendEmail({
      to: admin.email,
      subject: 'Test Email Configuration',
      text: 'This is a test email to verify your email settings configuration.',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="color: #2563eb;">Email Configuration Test</h1>
          <p>This is a test email to verify your email settings configuration.</p>
          <p>If you received this email, your email settings are working correctly.</p>
          <hr style="margin: 20px 0;" />
          <p style="color: #6b7280; font-size: 14px;">
            SMTP Configuration Details:<br/>
            Host: ${emailSettings.smtpHost}<br/>
            Port: ${emailSettings.smtpPort}<br/>
            Sender: ${emailSettings.senderName} &lt;${emailSettings.senderEmail}&gt;
          </p>
        </div>
      `,
      ...emailSettings
    });

    // Log the test email attempt
    await prisma.auditLog.create({
      data: {
        action: 'test_email',
        userId: admin.id,
        details: 'Sent test email for configuration verification',
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        resourceType: 'settings',
        resourceId: 'email_config'
      }
    });

    return NextResponse.json({ success: true, message: 'Test email sent successfully' });
  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { error: 'Failed to send test email', details: error.message },
      { status: 500 }
    );
  }
}