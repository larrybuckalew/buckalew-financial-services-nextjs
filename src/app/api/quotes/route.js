import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';
// Email configuration
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'quotes@buckalewfinancial.com';
const SMTP_HOST = process.env.EMAIL_HOST || process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.EMAIL_PORT || process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.EMAIL_USER || process.env.SMTP_USER;
const SMTP_PASS = process.env.EMAIL_PASSWORD || process.env.SMTP_PASS;
const SMTP_FROM = process.env.EMAIL_FROM || 'noreply@buckalew-financial.com';
export async function POST(request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, phone, zipCode, dateOfBirth, gender, maritalStatus, tobacco, healthConditions, coverageAmount, currentCoverage, additionalNotes, insuranceType, timestamp } = body;
        // Basic validation
        if (!firstName || !lastName || !email || !phone || !zipCode || !insuranceType) {
            return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
        }
        // Store quote in database
        const quote = await prisma.quote.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                zipCode,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
                gender,
                maritalStatus,
                tobacco,
                healthConditions,
                coverageAmount,
                currentCoverage,
                additionalNotes,
                insuranceType,
                submittedAt: new Date(timestamp)
            }
        });
        // Create email content for admin
        const adminEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1e40af; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">🔔 New Insurance Quote Request</h1>
          <p style="margin: 10px 0 0 0;">Quote ID: ${quote.id}</p>
        </div>
        
        <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <h2 style="color: #1e40af; margin: 0; font-size: 18px;">Insurance Type: ${insuranceType.toUpperCase()}</h2>
          </div>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td>${firstName} ${lastName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td><a href="tel:${phone}">${phone}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">ZIP Code:</td><td>${zipCode}</td></tr>
            ${dateOfBirth ? `<tr><td style="padding: 8px 0; font-weight: bold;">Date of Birth:</td><td>${new Date(dateOfBirth).toLocaleDateString()}</td></tr>` : ''}
            ${gender ? `<tr><td style="padding: 8px 0; font-weight: bold;">Gender:</td><td>${gender}</td></tr>` : ''}
            ${maritalStatus ? `<tr><td style="padding: 8px 0; font-weight: bold;">Marital Status:</td><td>${maritalStatus}</td></tr>` : ''}
            ${tobacco ? `<tr><td style="padding: 8px 0; font-weight: bold;">Tobacco Use:</td><td>${tobacco}</td></tr>` : ''}
            ${coverageAmount ? `<tr><td style="padding: 8px 0; font-weight: bold;">Coverage Amount:</td><td>${coverageAmount}</td></tr>` : ''}
            ${currentCoverage ? `<tr><td style="padding: 8px 0; font-weight: bold;">Current Coverage:</td><td>${currentCoverage}</td></tr>` : ''}
          </table>
          
          ${healthConditions ? `
          <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 6px;">
            <h3 style="margin: 0 0 10px 0; color: #92400e;">Health Conditions:</h3>
            <p style="margin: 0;">${healthConditions}</p>
          </div>` : ''}
          
          ${additionalNotes ? `
          <div style="margin-top: 20px; padding: 15px; background: #ecfdf5; border-radius: 6px;">
            <h3 style="margin: 0 0 10px 0; color: #047857;">Additional Notes:</h3>
            <p style="margin: 0;">${additionalNotes}</p>
          </div>` : ''}
          
          <div style="margin-top: 30px; text-align: center; padding: 15px; background: #f9fafb;">
            <p style="margin: 0; color: #6b7280;">
              <strong>Submitted:</strong> ${new Date(timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    `;
        // Create customer confirmation email
        const customerEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1e40af; color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">✅ Thank You, ${firstName}!</h1>
          <p style="margin: 15px 0 0 0; font-size: 18px;">We've received your insurance quote request</p>
        </div>
        
        <div style="padding: 30px; border: 1px solid #e5e7eb;">
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="margin: 0; color: #1e40af;">Quote Request: ${insuranceType.charAt(0).toUpperCase() + insuranceType.slice(1)} Insurance</h2>
            <p style="margin: 10px 0 0 0; color: #1e3a8a;">Reference ID: ${quote.id.slice(-8).toUpperCase()}</p>
          </div>
          
          <h3 style="color: #374151; margin: 0 0 15px 0;">What happens next?</h3>
          
          <div style="margin-bottom: 15px; padding: 15px; background: #f9fafb; border-radius: 6px;">
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
              <span style="color: #10b981; font-size: 20px; margin-right: 10px;">✓</span>
              <strong>Confirmation sent</strong>
            </div>
            <p style="margin: 0; color: #6b7280; font-size: 14px;">This email confirms we've received your request</p>
          </div>
          
          <div style="margin-bottom: 15px; padding: 15px; background: #f9fafb; border-radius: 6px;">
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
              <span style="color: #3b82f6; font-size: 20px; margin-right: 10px;">👨‍💼</span>
              <strong>Agent review (within 24 hours)</strong>
            </div>
            <p style="margin: 0; color: #6b7280; font-size: 14px;">Our licensed agent will review your information</p>
          </div>
          
          <div style="margin-bottom: 15px; padding: 15px; background: #f9fafb; border-radius: 6px;">
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
              <span style="color: #f59e0b; font-size: 20px; margin-right: 10px;">📋</span>
              <strong>Personalized quotes</strong>
            </div>
            <p style="margin: 0; color: #6b7280; font-size: 14px;">You'll receive customized coverage options</p>
          </div>
          
          <div style="margin-bottom: 25px; padding: 15px; background: #f9fafb; border-radius: 6px;">
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
              <span style="color: #8b5cf6; font-size: 20px; margin-right: 10px;">🤝</span>
              <strong>Expert guidance</strong>
            </div>
            <p style="margin: 0; color: #6b7280; font-size: 14px;">We'll help you choose the best coverage for your needs</p>
          </div>
          
          <div style="text-align: center; padding: 20px; background: #1e40af; color: white; border-radius: 8px;">
            <p style="margin: 0 0 10px 0; font-size: 16px;">Questions? We're here to help!</p>
            <p style="margin: 0; font-size: 18px; font-weight: bold;">📞 (555) 123-4567</p>
          </div>
          
          <div style="margin-top: 20px; text-align: center; color: #6b7280; font-size: 12px;">
            <p>Buckalew Financial Services<br>
            Licensed Insurance Agency<br>
            This is an automated confirmation. Please do not reply to this email.</p>
          </div>
        </div>
      </div>
    `;
        // Configure nodemailer (only if SMTP credentials are provided)
        let emailSent = false;
        if (SMTP_USER && SMTP_PASS) {
            try {
                const transporter = nodemailer.createTransporter({
                    host: SMTP_HOST,
                    port: SMTP_PORT,
                    secure: SMTP_PORT === 465,
                    auth: {
                        user: SMTP_USER,
                        pass: SMTP_PASS,
                    },
                });
                // Send admin notification
                await transporter.sendMail({
                    from: SMTP_FROM,
                    to: ADMIN_EMAIL,
                    subject: `🔔 New ${insuranceType.toUpperCase()} Quote Request - ${firstName} ${lastName}`,
                    html: adminEmailContent,
                });
                // Send customer confirmation
                await transporter.sendMail({
                    from: SMTP_FROM,
                    to: email,
                    subject: 'Your Insurance Quote Request Confirmation - Buckalew Financial Services',
                    html: customerEmailContent,
                });
                emailSent = true;
            }
            catch (emailError) {
                console.error('Email sending failed:', emailError);
                // Continue processing even if email fails
            }
        }
        // Log the successful submission
        console.log('✅ Quote submission processed:', {
            id: quote.id,
            insuranceType,
            name: `${firstName} ${lastName}`,
            email,
            emailSent,
            timestamp: new Date().toISOString()
        });
        return NextResponse.json({
            message: 'Quote request submitted successfully',
            id: quote.id,
            emailSent
        }, { status: 200 });
    }
    catch (error) {
        console.error('❌ Error processing quote request:', error);
        // Return appropriate error message
        if (error.name === 'ValidationError') {
            return NextResponse.json({ error: 'Invalid data provided', details: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal server error. Please try again later.' }, { status: 500 });
    }
}
// GET endpoint to fetch quotes (admin only)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const insuranceType = searchParams.get('type');
        const skip = (page - 1) * limit;
        const where = insuranceType ? { insuranceType } : {};
        const [quotes, total] = await Promise.all([
            prisma.quote.findMany({
                where,
                orderBy: { submittedAt: 'desc' },
                skip,
                take: limit
            }),
            prisma.quote.count({ where })
        ]);
        return NextResponse.json({
            quotes,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    }
    catch (error) {
        console.error('Error fetching quotes:', error);
        return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
    }
}
