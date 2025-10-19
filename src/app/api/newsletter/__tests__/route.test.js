import { NextRequest } from 'next/server';
import { POST } from '../route';
// Mock nodemailer
jest.mock('nodemailer', () => ({
    createTransporter: jest.fn(() => ({
        sendMail: jest.fn().mockResolvedValue({ messageId: 'test-message-id' })
    }))
}));
// Mock environment variables
const mockEnv = {
    SMTP_HOST: 'smtp.test.com',
    SMTP_PORT: '587',
    SMTP_USER: 'test@test.com',
    SMTP_PASS: 'testpass',
    SMTP_FROM: 'noreply@test.com',
    ADMIN_EMAIL: 'admin@test.com'
};
describe('/api/newsletter', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Mock environment variables
        Object.keys(mockEnv).forEach(key => {
            process.env[key] = mockEnv[key];
        });
    });
    afterEach(() => {
        // Clean up environment variables
        Object.keys(mockEnv).forEach(key => {
            delete process.env[key];
        });
    });
    describe('POST', () => {
        it('should successfully process valid newsletter subscription', async () => {
            const validEmail = 'test@example.com';
            const request = new NextRequest('http://localhost:3000/api/newsletter', {
                method: 'POST',
                body: JSON.stringify({ email: validEmail }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const response = await POST(request);
            const data = await response.json();
            expect(response.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.message).toBe('Successfully subscribed to newsletter');
        });
        it('should return 400 for missing email', async () => {
            const request = new NextRequest('http://localhost:3000/api/newsletter', {
                method: 'POST',
                body: JSON.stringify({}),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const response = await POST(request);
            const data = await response.json();
            expect(response.status).toBe(400);
            expect(data.error).toBe('Email is required');
        });
        it('should return 400 for empty email', async () => {
            const request = new NextRequest('http://localhost:3000/api/newsletter', {
                method: 'POST',
                body: JSON.stringify({ email: '' }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const response = await POST(request);
            const data = await response.json();
            expect(response.status).toBe(400);
            expect(data.error).toBe('Email is required');
        });
        it('should return 400 for invalid email format', async () => {
            const invalidEmails = [
                'invalid-email',
                'test@',
                '@example.com',
                'test..test@example.com',
                'test@example',
                'test @example.com'
            ];
            for (const email of invalidEmails) {
                const request = new NextRequest('http://localhost:3000/api/newsletter', {
                    method: 'POST',
                    body: JSON.stringify({ email }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const response = await POST(request);
                const data = await response.json();
                expect(response.status).toBe(400);
                expect(data.error).toBe('Invalid email format');
            }
        });
        it('should accept valid email formats', async () => {
            const validEmails = [
                'test@example.com',
                'user.name@domain.co.uk',
                'first+last@subdomain.example.org',
                'user_name@example.com',
                'test123@test123.com'
            ];
            for (const email of validEmails) {
                const request = new NextRequest('http://localhost:3000/api/newsletter', {
                    method: 'POST',
                    body: JSON.stringify({ email }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const response = await POST(request);
                const data = await response.json();
                expect(response.status).toBe(200);
                expect(data.success).toBe(true);
            }
        });
        it('should handle email sending errors gracefully', async () => {
            // Mock sendMail to throw an error
            const nodemailer = require('nodemailer');
            nodemailer.createTransporter.mockReturnValueOnce({
                sendMail: jest.fn().mockRejectedValue(new Error('Email service unavailable'))
            });
            const request = new NextRequest('http://localhost:3000/api/newsletter', {
                method: 'POST',
                body: JSON.stringify({ email: 'test@example.com' }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const response = await POST(request);
            const data = await response.json();
            expect(response.status).toBe(500);
            expect(data.error).toBe('Failed to subscribe to newsletter');
        });
        it('should handle invalid JSON gracefully', async () => {
            const request = new NextRequest('http://localhost:3000/api/newsletter', {
                method: 'POST',
                body: 'invalid json',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const response = await POST(request);
            const data = await response.json();
            expect(response.status).toBe(500);
            expect(data.error).toBe('Failed to subscribe to newsletter');
        });
        it('should send admin notification email', async () => {
            const nodemailer = require('nodemailer');
            const mockSendMail = jest.fn().mockResolvedValue({ messageId: 'test-message-id' });
            nodemailer.createTransporter.mockReturnValue({
                sendMail: mockSendMail
            });
            const testEmail = 'test@example.com';
            const request = new NextRequest('http://localhost:3000/api/newsletter', {
                method: 'POST',
                body: JSON.stringify({ email: testEmail }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            await POST(request);
            expect(mockSendMail).toHaveBeenCalledTimes(2);
            // Check admin email
            const adminEmailCall = mockSendMail.mock.calls[0][0];
            expect(adminEmailCall.to).toBe(mockEnv.ADMIN_EMAIL);
            expect(adminEmailCall.subject).toBe('New Newsletter Subscription');
            expect(adminEmailCall.html).toContain(testEmail);
        });
        it('should send welcome email to subscriber', async () => {
            const nodemailer = require('nodemailer');
            const mockSendMail = jest.fn().mockResolvedValue({ messageId: 'test-message-id' });
            nodemailer.createTransporter.mockReturnValue({
                sendMail: mockSendMail
            });
            const testEmail = 'test@example.com';
            const request = new NextRequest('http://localhost:3000/api/newsletter', {
                method: 'POST',
                body: JSON.stringify({ email: testEmail }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            await POST(request);
            expect(mockSendMail).toHaveBeenCalledTimes(2);
            // Check welcome email
            const welcomeEmailCall = mockSendMail.mock.calls[1][0];
            expect(welcomeEmailCall.to).toBe(testEmail);
            expect(welcomeEmailCall.subject).toBe('Welcome to Buckalew Financial Services Newsletter');
            expect(welcomeEmailCall.html).toContain('Welcome to Our Newsletter');
        });
        it('should include proper subscription date in admin email', async () => {
            const nodemailer = require('nodemailer');
            const mockSendMail = jest.fn().mockResolvedValue({ messageId: 'test-message-id' });
            nodemailer.createTransporter.mockReturnValue({
                sendMail: mockSendMail
            });
            // Mock Date to ensure consistent testing
            const mockDate = new Date('2024-01-15T10:30:00Z');
            jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
            const testEmail = 'test@example.com';
            const request = new NextRequest('http://localhost:3000/api/newsletter', {
                method: 'POST',
                body: JSON.stringify({ email: testEmail }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            await POST(request);
            const adminEmailCall = mockSendMail.mock.calls[0][0];
            expect(adminEmailCall.html).toContain('2024');
            // Restore Date
            global.Date.mockRestore();
        });
        it('should include helpful links in welcome email', async () => {
            const nodemailer = require('nodemailer');
            const mockSendMail = jest.fn().mockResolvedValue({ messageId: 'test-message-id' });
            nodemailer.createTransporter.mockReturnValue({
                sendMail: mockSendMail
            });
            const testEmail = 'test@example.com';
            const request = new NextRequest('http://localhost:3000/api/newsletter', {
                method: 'POST',
                body: JSON.stringify({ email: testEmail }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            await POST(request);
            const welcomeEmailCall = mockSendMail.mock.calls[1][0];
            expect(welcomeEmailCall.html).toContain('buckalewfinancial.com/blog');
            expect(welcomeEmailCall.html).toContain('buckalewfinancial.com/quote');
            expect(welcomeEmailCall.html).toContain('buckalewfinancial.com/contact');
        });
    });
});
