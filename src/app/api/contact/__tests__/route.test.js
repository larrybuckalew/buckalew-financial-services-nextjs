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
describe('/api/contact', () => {
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
        const validContactData = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '(555) 123-4567',
            service: 'medicare',
            message: 'I need help with Medicare enrollment.',
            smsConsent: true,
            privacyConsent: true
        };
        it('should successfully process valid contact form submission', async () => {
            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify(validContactData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const response = await POST(request);
            const data = await response.json();
            expect(response.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.message).toBe('Contact form submitted successfully');
        });
        it('should return 400 for missing required fields', async () => {
            const invalidData = { ...validContactData };
            delete invalidData.name;
            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify(invalidData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const response = await POST(request);
            const data = await response.json();
            expect(response.status).toBe(400);
            expect(data.error).toBe('Missing required fields');
        });
        it('should return 400 for missing name', async () => {
            const invalidData = { ...validContactData, name: '' };
            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify(invalidData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const response = await POST(request);
            const data = await response.json();
            expect(response.status).toBe(400);
            expect(data.error).toBe('Missing required fields');
        });
        it('should return 400 for missing email', async () => {
            const invalidData = { ...validContactData, email: '' };
            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify(invalidData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const response = await POST(request);
            const data = await response.json();
            expect(response.status).toBe(400);
            expect(data.error).toBe('Missing required fields');
        });
        it('should return 400 for missing phone', async () => {
            const invalidData = { ...validContactData, phone: '' };
            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify(invalidData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const response = await POST(request);
            const data = await response.json();
            expect(response.status).toBe(400);
            expect(data.error).toBe('Missing required fields');
        });
        it('should return 400 for missing service', async () => {
            const invalidData = { ...validContactData, service: '' };
            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify(invalidData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const response = await POST(request);
            const data = await response.json();
            expect(response.status).toBe(400);
            expect(data.error).toBe('Missing required fields');
        });
        it('should return 400 for missing message', async () => {
            const invalidData = { ...validContactData, message: '' };
            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify(invalidData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const response = await POST(request);
            const data = await response.json();
            expect(response.status).toBe(400);
            expect(data.error).toBe('Missing required fields');
        });
        it('should handle different service types', async () => {
            const serviceTypes = ['medicare', 'life', 'health', 'financial-planning', 'other'];
            for (const service of serviceTypes) {
                const requestData = { ...validContactData, service };
                const request = new NextRequest('http://localhost:3000/api/contact', {
                    method: 'POST',
                    body: JSON.stringify(requestData),
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
        it('should handle consent preferences', async () => {
            const testCases = [
                { smsConsent: true, privacyConsent: true },
                { smsConsent: false, privacyConsent: true },
                { smsConsent: true, privacyConsent: false },
                { smsConsent: false, privacyConsent: false }
            ];
            for (const consents of testCases) {
                const requestData = { ...validContactData, ...consents };
                const request = new NextRequest('http://localhost:3000/api/contact', {
                    method: 'POST',
                    body: JSON.stringify(requestData),
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
            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify(validContactData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const response = await POST(request);
            const data = await response.json();
            expect(response.status).toBe(500);
            expect(data.error).toBe('Failed to submit contact form');
        });
        it('should handle invalid JSON gracefully', async () => {
            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: 'invalid json',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const response = await POST(request);
            const data = await response.json();
            expect(response.status).toBe(500);
            expect(data.error).toBe('Failed to submit contact form');
        });
        it('should include proper email content in admin notification', async () => {
            const nodemailer = require('nodemailer');
            const mockSendMail = jest.fn().mockResolvedValue({ messageId: 'test-message-id' });
            nodemailer.createTransporter.mockReturnValue({
                sendMail: mockSendMail
            });
            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify(validContactData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            await POST(request);
            expect(mockSendMail).toHaveBeenCalledTimes(2);
            // Check admin email
            const adminEmailCall = mockSendMail.mock.calls[0][0];
            expect(adminEmailCall.to).toBe(mockEnv.ADMIN_EMAIL);
            expect(adminEmailCall.subject).toContain('New Contact Form Submission');
            expect(adminEmailCall.html).toContain(validContactData.name);
            expect(adminEmailCall.html).toContain(validContactData.email);
            expect(adminEmailCall.html).toContain(validContactData.phone);
            expect(adminEmailCall.html).toContain(validContactData.message);
        });
        it('should include proper email content in customer confirmation', async () => {
            const nodemailer = require('nodemailer');
            const mockSendMail = jest.fn().mockResolvedValue({ messageId: 'test-message-id' });
            nodemailer.createTransporter.mockReturnValue({
                sendMail: mockSendMail
            });
            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify(validContactData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            await POST(request);
            expect(mockSendMail).toHaveBeenCalledTimes(2);
            // Check customer email
            const customerEmailCall = mockSendMail.mock.calls[1][0];
            expect(customerEmailCall.to).toBe(validContactData.email);
            expect(customerEmailCall.subject).toContain('Thank You for Contacting Buckalew Financial Services');
            expect(customerEmailCall.html).toContain(validContactData.name);
        });
    });
});
