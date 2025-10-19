import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactPage from '../page';
// Mock fetch
global.fetch = jest.fn();
describe('ContactPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ success: true, message: 'Form submitted successfully' })
        });
    });
    it('should render the contact page', () => {
        render(<ContactPage />);
        expect(screen.getByText('Contact Buckalew Financial Services')).toBeInTheDocument();
        expect(screen.getByText('Send Us a Message')).toBeInTheDocument();
    });
    it('should render contact methods', () => {
        render(<ContactPage />);
        expect(screen.getByText('Phone')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Office Location')).toBeInTheDocument();
        expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
        expect(screen.getByText('info@buckalewfinancial.com')).toBeInTheDocument();
        expect(screen.getByText('123 Financial Plaza, Suite 100, Cityville, ST 12345')).toBeInTheDocument();
    });
    it('should render form fields', () => {
        render(<ContactPage />);
        expect(screen.getByLabelText('Full Name *')).toBeInTheDocument();
        expect(screen.getByLabelText('Email Address *')).toBeInTheDocument();
        expect(screen.getByLabelText('Phone Number *')).toBeInTheDocument();
        expect(screen.getByLabelText('Interested Service *')).toBeInTheDocument();
        expect(screen.getByLabelText('Your Message *')).toBeInTheDocument();
    });
    it('should render consent checkboxes', () => {
        render(<ContactPage />);
        const smsConsentCheckbox = screen.getByLabelText(/I consent to receive automated marketing text messages/);
        const privacyConsentCheckbox = screen.getByLabelText(/I agree to the Privacy Policy/);
        expect(smsConsentCheckbox).toBeInTheDocument();
        expect(privacyConsentCheckbox).toBeInTheDocument();
        expect(smsConsentCheckbox).toBeRequired();
        expect(privacyConsentCheckbox).toBeRequired();
    });
    it('should update form values when user types', async () => {
        const user = userEvent.setup();
        render(<ContactPage />);
        const nameInput = screen.getByLabelText('Full Name *');
        const emailInput = screen.getByLabelText('Email Address *');
        const phoneInput = screen.getByLabelText('Phone Number *');
        const messageInput = screen.getByLabelText('Your Message *');
        await user.type(nameInput, 'John Doe');
        await user.type(emailInput, 'john.doe@example.com');
        await user.type(phoneInput, '(555) 123-4567');
        await user.type(messageInput, 'I need help with Medicare.');
        expect(nameInput).toHaveValue('John Doe');
        expect(emailInput).toHaveValue('john.doe@example.com');
        expect(phoneInput).toHaveValue('(555) 123-4567');
        expect(messageInput).toHaveValue('I need help with Medicare.');
    });
    it('should handle service selection', async () => {
        const user = userEvent.setup();
        render(<ContactPage />);
        const serviceSelect = screen.getByLabelText('Interested Service *');
        await user.selectOptions(serviceSelect, 'medicare');
        expect(serviceSelect).toHaveValue('medicare');
        await user.selectOptions(serviceSelect, 'life');
        expect(serviceSelect).toHaveValue('life');
    });
    it('should handle checkbox changes', async () => {
        const user = userEvent.setup();
        render(<ContactPage />);
        const smsConsentCheckbox = screen.getByLabelText(/I consent to receive automated marketing text messages/);
        const privacyConsentCheckbox = screen.getByLabelText(/I agree to the Privacy Policy/);
        expect(smsConsentCheckbox).not.toBeChecked();
        expect(privacyConsentCheckbox).not.toBeChecked();
        await user.click(smsConsentCheckbox);
        await user.click(privacyConsentCheckbox);
        expect(smsConsentCheckbox).toBeChecked();
        expect(privacyConsentCheckbox).toBeChecked();
    });
    it('should show validation error for missing required fields', async () => {
        const user = userEvent.setup();
        render(<ContactPage />);
        const submitButton = screen.getByText('Send Message');
        await user.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText('Please fill in all required fields.')).toBeInTheDocument();
        });
    });
    it('should show validation error for missing consent checkboxes', async () => {
        const user = userEvent.setup();
        render(<ContactPage />);
        // Fill required fields but don't check consent boxes
        await user.type(screen.getByLabelText('Full Name *'), 'John Doe');
        await user.type(screen.getByLabelText('Email Address *'), 'john@example.com');
        await user.type(screen.getByLabelText('Phone Number *'), '555-123-4567');
        await user.selectOptions(screen.getByLabelText('Interested Service *'), 'medicare');
        await user.type(screen.getByLabelText('Your Message *'), 'Test message');
        const submitButton = screen.getByText('Send Message');
        await user.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText('Please accept the required consent checkboxes.')).toBeInTheDocument();
        });
    });
    it('should submit form successfully with valid data', async () => {
        const user = userEvent.setup();
        render(<ContactPage />);
        // Fill out complete form
        await user.type(screen.getByLabelText('Full Name *'), 'John Doe');
        await user.type(screen.getByLabelText('Email Address *'), 'john.doe@example.com');
        await user.type(screen.getByLabelText('Phone Number *'), '(555) 123-4567');
        await user.selectOptions(screen.getByLabelText('Interested Service *'), 'medicare');
        await user.type(screen.getByLabelText('Your Message *'), 'I need help with Medicare enrollment.');
        await user.click(screen.getByLabelText(/I consent to receive automated marketing text messages/));
        await user.click(screen.getByLabelText(/I agree to the Privacy Policy/));
        const submitButton = screen.getByText('Send Message');
        await user.click(submitButton);
        // Should show loading state
        await waitFor(() => {
            expect(screen.getByText('Sending...')).toBeInTheDocument();
        });
        // Should show success message
        await waitFor(() => {
            expect(screen.getByText('Thank you! Your message has been sent successfully. We\'ll contact you within 24 hours.')).toBeInTheDocument();
        });
        // Should call fetch with correct data
        expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '(555) 123-4567',
                service: 'medicare',
                message: 'I need help with Medicare enrollment.',
                smsConsent: true,
                privacyConsent: true
            })
        });
    });
    it('should reset form after successful submission', async () => {
        const user = userEvent.setup();
        render(<ContactPage />);
        // Fill out and submit form
        await user.type(screen.getByLabelText('Full Name *'), 'John Doe');
        await user.type(screen.getByLabelText('Email Address *'), 'john.doe@example.com');
        await user.type(screen.getByLabelText('Phone Number *'), '(555) 123-4567');
        await user.selectOptions(screen.getByLabelText('Interested Service *'), 'medicare');
        await user.type(screen.getByLabelText('Your Message *'), 'Test message');
        await user.click(screen.getByLabelText(/I consent to receive automated marketing text messages/));
        await user.click(screen.getByLabelText(/I agree to the Privacy Policy/));
        await user.click(screen.getByText('Send Message'));
        await waitFor(() => {
            expect(screen.getByText('Thank you! Your message has been sent successfully. We\'ll contact you within 24 hours.')).toBeInTheDocument();
        });
        // Form should be reset
        expect(screen.getByLabelText('Full Name *')).toHaveValue('');
        expect(screen.getByLabelText('Email Address *')).toHaveValue('');
        expect(screen.getByLabelText('Phone Number *')).toHaveValue('');
        expect(screen.getByLabelText('Interested Service *')).toHaveValue('');
        expect(screen.getByLabelText('Your Message *')).toHaveValue('');
        expect(screen.getByLabelText(/I consent to receive automated marketing text messages/)).not.toBeChecked();
        expect(screen.getByLabelText(/I agree to the Privacy Policy/)).not.toBeChecked();
    });
    it('should handle API errors gracefully', async () => {
        const user = userEvent.setup();
        // Mock fetch to return an error
        global.fetch.mockRejectedValue(new Error('Network error'));
        render(<ContactPage />);
        // Fill out form
        await user.type(screen.getByLabelText('Full Name *'), 'John Doe');
        await user.type(screen.getByLabelText('Email Address *'), 'john.doe@example.com');
        await user.type(screen.getByLabelText('Phone Number *'), '(555) 123-4567');
        await user.selectOptions(screen.getByLabelText('Interested Service *'), 'medicare');
        await user.type(screen.getByLabelText('Your Message *'), 'Test message');
        await user.click(screen.getByLabelText(/I consent to receive automated marketing text messages/));
        await user.click(screen.getByLabelText(/I agree to the Privacy Policy/));
        await user.click(screen.getByText('Send Message'));
        await waitFor(() => {
            expect(screen.getByText('There was an error sending your message. Please try again or call us directly.')).toBeInTheDocument();
        });
    });
    it('should handle API response errors', async () => {
        const user = userEvent.setup();
        // Mock fetch to return a failure response
        global.fetch.mockResolvedValue({
            ok: false,
            json: async () => ({ error: 'Server error' })
        });
        render(<ContactPage />);
        // Fill out form
        await user.type(screen.getByLabelText('Full Name *'), 'John Doe');
        await user.type(screen.getByLabelText('Email Address *'), 'john.doe@example.com');
        await user.type(screen.getByLabelText('Phone Number *'), '(555) 123-4567');
        await user.selectOptions(screen.getByLabelText('Interested Service *'), 'medicare');
        await user.type(screen.getByLabelText('Your Message *'), 'Test message');
        await user.click(screen.getByLabelText(/I consent to receive automated marketing text messages/));
        await user.click(screen.getByLabelText(/I agree to the Privacy Policy/));
        await user.click(screen.getByText('Send Message'));
        await waitFor(() => {
            expect(screen.getByText('There was an error sending your message. Please try again or call us directly.')).toBeInTheDocument();
        });
    });
    it('should disable submit button during submission', async () => {
        const user = userEvent.setup();
        // Mock fetch to delay response
        global.fetch.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({
            ok: true,
            json: async () => ({ success: true })
        }), 100)));
        render(<ContactPage />);
        // Fill out form
        await user.type(screen.getByLabelText('Full Name *'), 'John Doe');
        await user.type(screen.getByLabelText('Email Address *'), 'john.doe@example.com');
        await user.type(screen.getByLabelText('Phone Number *'), '(555) 123-4567');
        await user.selectOptions(screen.getByLabelText('Interested Service *'), 'medicare');
        await user.type(screen.getByLabelText('Your Message *'), 'Test message');
        await user.click(screen.getByLabelText(/I consent to receive automated marketing text messages/));
        await user.click(screen.getByLabelText(/I agree to the Privacy Policy/));
        const submitButton = screen.getByText('Send Message');
        await user.click(submitButton);
        // Button should be disabled during submission
        await waitFor(() => {
            const sendingButton = screen.getByText('Sending...');
            expect(sendingButton).toBeDisabled();
        });
    });
    it('should render service options correctly', () => {
        render(<ContactPage />);
        const serviceSelect = screen.getByLabelText('Interested Service *');
        expect(screen.getByRole('option', { name: 'Select a Service' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Medicare Insurance' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Life Insurance' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Health Insurance' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Financial Planning' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Other' })).toBeInTheDocument();
    });
    it('should have proper form attributes', () => {
        render(<ContactPage />);
        const nameInput = screen.getByLabelText('Full Name *');
        const emailInput = screen.getByLabelText('Email Address *');
        const phoneInput = screen.getByLabelText('Phone Number *');
        const serviceSelect = screen.getByLabelText('Interested Service *');
        const messageInput = screen.getByLabelText('Your Message *');
        expect(nameInput).toHaveAttribute('type', 'text');
        expect(nameInput).toBeRequired();
        expect(emailInput).toHaveAttribute('type', 'email');
        expect(emailInput).toBeRequired();
        expect(phoneInput).toHaveAttribute('type', 'tel');
        expect(phoneInput).toBeRequired();
        expect(serviceSelect).toBeRequired();
        expect(messageInput).toBeRequired();
    });
});
