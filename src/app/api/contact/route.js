import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, phone, service, message, smsConsent, privacyConsent } = body;
        // Validate required fields
        if (!name || !email || !phone || !service || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        // Create email transporter (using environment variables)
        const transporter = nodemailer.createTransporter({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        // Format service name for display
        const serviceNames = {
            'medicare': 'Medicare Insurance',
            'life': 'Life Insurance',
            'health': 'Health Insurance',
            'financial-planning': 'Financial Planning',
            'other': 'Other Services'
        };
        const serviceName = serviceNames[service] || service;
        // Email to admin
        const adminMailOptions = {
            from: process.env.SMTP_FROM,
            to: process.env.ADMIN_EMAIL,
            subject: `New Contact Form Submission - ${serviceName}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">New Contact Form Submission</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Service Interest:</strong> ${serviceName}</p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #92400e;">Consent Information</h3>
            <p><strong>SMS Consent:</strong> ${smsConsent ? 'Yes' : 'No'}</p>
            <p><strong>Privacy Policy Consent:</strong> ${privacyConsent ? 'Yes' : 'No'}</p>
          </div>

          <div style="margin: 30px 0; padding: 20px; border-left: 4px solid #1e40af; background-color: #eff6ff;">
            <p style="margin: 0;"><strong>Next Steps:</strong></p>
            <ul style="margin: 10px 0 0 0; padding-left: 20px;">
              <li>Contact the customer within 24 hours</li>
              <li>Review their service interest: ${serviceName}</li>
              <li>Prepare relevant information and quotes</li>
              <li>Note their communication preferences</li>
            </ul>
          </div>
        </div>
      `,
        };
        // Email confirmation to customer
        const customerMailOptions = {
            from: process.env.SMTP_FROM,
            to: email,
            subject: 'Thank You for Contacting Buckalew Financial Services',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px; background-color: #1e40af; color: white; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">Buckalew Financial Services</h1>
            <p style="margin: 10px 0 0 0;">Your Trusted Financial Partner</p>
          </div>

          <div style="padding: 30px; background-color: #ffffff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1e40af; margin-top: 0;">Thank You for Reaching Out!</h2>
            
            <p>Dear ${name},</p>
            
            <p>Thank you for contacting Buckalew Financial Services regarding <strong>${serviceName}</strong>. We have received your message and appreciate your interest in our services.</p>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #374151;">What Happens Next?</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li>One of our licensed agents will contact you within 24 hours</li>
                <li>We'll discuss your specific needs for ${serviceName}</li>
                <li>We'll provide personalized recommendations and quotes</li>
                <li>All consultations are free with no obligation</li>
              </ul>
            </div>

            <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1e40af;">Your Message Summary</h3>
              <p><strong>Service Interest:</strong> ${serviceName}</p>
              <p><strong>Contact Phone:</strong> ${phone}</p>
              <p style="margin-bottom: 0;"><strong>Your Message:</strong></p>
              <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px; margin-top: 5px;">${message}</p>
            </div>

            <p>If you have any immediate questions or need to speak with someone urgently, please don't hesitate to call us directly at <strong>(555) 123-4567</strong>.</p>
            
            <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
              <p style="margin: 0; font-weight: bold; color: #374151;">Buckalew Financial Services</p>
              <p style="margin: 5px 0;">123 Financial Plaza, Suite 100</p>
              <p style="margin: 5px 0;">Cityville, ST 12345</p>
              <p style="margin: 5px 0;">Phone: (555) 123-4567</p>
              <p style="margin: 5px 0;">Email: info@buckalewfinancial.com</p>
            </div>

            <p style="font-size: 14px; color: #6b7280; margin-bottom: 0;">
              Thank you for choosing Buckalew Financial Services. We look forward to helping you secure your financial future.
            </p>
          </div>
        </div>
      `,
        };
        // Send emails
        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(customerMailOptions);
        return NextResponse.json({
            success: true,
            message: 'Contact form submitted successfully'
        });
    }
    catch (error) {
        console.error('Contact form submission error:', error);
        return NextResponse.json({ error: 'Failed to submit contact form' }, { status: 500 });
    }
}
