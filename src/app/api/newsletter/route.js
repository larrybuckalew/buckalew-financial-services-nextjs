import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
export async function POST(request) {
    try {
        const body = await request.json();
        const { email } = body;
        // Validate email
        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
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
        // Email to admin about new newsletter subscription
        const adminMailOptions = {
            from: process.env.SMTP_FROM,
            to: process.env.ADMIN_EMAIL,
            subject: 'New Newsletter Subscription',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">New Newsletter Subscription</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Subscriber Information</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subscription Date:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <div style="margin: 30px 0; padding: 20px; border-left: 4px solid #1e40af; background-color: #eff6ff;">
            <p style="margin: 0;"><strong>Next Steps:</strong></p>
            <ul style="margin: 10px 0 0 0; padding-left: 20px;">
              <li>Add the subscriber to your newsletter list</li>
              <li>Send welcome email with recent content</li>
              <li>Consider scheduling a follow-up call for high-value prospects</li>
            </ul>
          </div>
        </div>
      `,
        };
        // Welcome email to subscriber
        const welcomeMailOptions = {
            from: process.env.SMTP_FROM,
            to: email,
            subject: 'Welcome to Buckalew Financial Services Newsletter',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px; background-color: #1e40af; color: white; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">Welcome to Our Newsletter!</h1>
            <p style="margin: 10px 0 0 0;">Thank you for subscribing to Buckalew Financial Services</p>
          </div>

          <div style="padding: 30px; background-color: #ffffff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1e40af; margin-top: 0;">What to Expect</h2>
            
            <p>You'll receive our newsletter with:</p>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <ul style="margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 10px;"><strong>Expert Financial Insights:</strong> Market updates and analysis from our experienced team</li>
                <li style="margin-bottom: 10px;"><strong>Insurance Education:</strong> Medicare, Life, and Health insurance tips and updates</li>
                <li style="margin-bottom: 10px;"><strong>Retirement Planning:</strong> Strategies to secure your financial future</li>
                <li style="margin-bottom: 10px;"><strong>Exclusive Content:</strong> Special offers and early access to resources</li>
              </ul>
            </div>

            <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1e40af;">Latest Articles</h3>
              <p style="margin-bottom: 15px;"><strong>📖 Understanding Medicare: A Comprehensive Guide for 2024</strong><br>
              Navigate the complexities of Medicare with expert guidance.</p>
              
              <p style="margin-bottom: 15px;"><strong>🛡️ Life Insurance: Protecting Your Family's Financial Future</strong><br>
              Learn how to choose the right coverage for your loved ones.</p>
              
              <p style="margin-bottom: 0;"><strong>💰 Retirement Planning: Start Early, Retire Comfortably</strong><br>
              Discover strategies to build wealth for a secure retirement.</p>
              
              <div style="text-align: center; margin-top: 20px;">
                <a href="https://buckalewfinancial.com/blog" 
                   style="background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  Read Our Blog
                </a>
              </div>
            </div>

            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #374151;">Ready for Personalized Advice?</h3>
              <p style="margin-bottom: 15px;">Our experienced advisors are here to help with your specific financial needs.</p>
              <div style="text-align: center;">
                <a href="https://buckalewfinancial.com/quote" 
                   style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-right: 10px;">
                  Get Free Quote
                </a>
                <a href="https://buckalewfinancial.com/contact" 
                   style="border: 2px solid #1e40af; color: #1e40af; padding: 10px 22px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  Schedule Consultation
                </a>
              </div>
            </div>

            <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
              <p style="margin: 0; font-weight: bold; color: #374151;">Buckalew Financial Services</p>
              <p style="margin: 5px 0;">123 Financial Plaza, Suite 100</p>
              <p style="margin: 5px 0;">Cityville, ST 12345</p>
              <p style="margin: 5px 0;">Phone: (555) 123-4567</p>
              <p style="margin: 5px 0;">Email: info@buckalewfinancial.com</p>
            </div>

            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="font-size: 12px; color: #6b7280; margin-bottom: 0;">
                You received this email because you subscribed to our newsletter. 
                <br>
                <a href="#" style="color: #6b7280;">Unsubscribe</a> | 
                <a href="#" style="color: #6b7280;">Update Preferences</a>
              </p>
            </div>
          </div>
        </div>
      `,
        };
        // Send emails
        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(welcomeMailOptions);
        return NextResponse.json({
            success: true,
            message: 'Successfully subscribed to newsletter'
        });
    }
    catch (error) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json({ error: 'Failed to subscribe to newsletter' }, { status: 500 });
    }
}
