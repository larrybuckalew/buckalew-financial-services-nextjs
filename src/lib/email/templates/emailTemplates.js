/**
 * Professional HTML Email Templates for Buckalew Financial Services
 * 
 * Company Colors:
 * - Primary: #1e3a8a (Navy Blue)
 * - Secondary: #3b82f6 (Bright Blue)  
 * - Accent: #f59e0b (Gold/Amber)
 * - Success: #10b981 (Green)
 * - Background: #f3f4f6 (Light Gray)
 */

const COMPANY_COLORS = {
  primary: '#1e3a8a',
  secondary: '#3b82f6',
  accent: '#f59e0b',
  success: '#10b981',
  background: '#f3f4f6',
  text: '#374151',
  textLight: '#6b7280',
  white: '#ffffff',
};

/**
 * Base email template wrapper
 */
function getEmailWrapper(content, preheader = '') {
  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title>Buckalew Financial Services</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      -webkit-font-smoothing: antialiased;
      background-color: ${COMPANY_COLORS.background};
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }
    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }
    .button {
      display: inline-block;
      padding: 16px 32px;
      background-color: ${COMPANY_COLORS.secondary};
      color: ${COMPANY_COLORS.white} !important;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
    }
    .button:hover {
      background-color: ${COMPANY_COLORS.primary};
    }
    @media only screen and (max-width: 600px) {
      .content {
        width: 100% !important;
      }
      .button {
        width: 100% !important;
        display: block !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${COMPANY_COLORS.background};">
  <!-- Preheader text -->
  <div style="display: none; max-height: 0px; overflow: hidden;">
    ${preheader}
  </div>

  <!-- Email Container -->
  <table role="presentation" style="width: 100%; background-color: ${COMPANY_COLORS.background};" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        
        <!-- Main Content Table -->
        <table role="presentation" class="content" style="width: 600px; background-color: ${COMPANY_COLORS.white}; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" cellpadding="0" cellspacing="0">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, ${COMPANY_COLORS.primary} 0%, ${COMPANY_COLORS.secondary} 100%); padding: 40px 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: ${COMPANY_COLORS.white}; font-size: 28px; font-weight: 700;">
                Buckalew Financial Services
              </h1>
              <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                Your Trusted Insurance & Financial Partner
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: ${COMPANY_COLORS.background}; border-radius: 0 0 12px 12px; border-top: 3px solid ${COMPANY_COLORS.accent};">
              <table role="presentation" style="width: 100%;" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align: center; padding-bottom: 20px;">
                    <p style="margin: 0 0 15px; color: ${COMPANY_COLORS.text}; font-size: 14px; font-weight: 600;">
                      Contact Us
                    </p>
                    <p style="margin: 0 0 8px; color: ${COMPANY_COLORS.textLight}; font-size: 13px;">
                      📞 <a href="tel:+18447797600" style="color: ${COMPANY_COLORS.secondary}; text-decoration: none;">(844) 779-7600</a>
                    </p>
                    <p style="margin: 0 0 8px; color: ${COMPANY_COLORS.textLight}; font-size: 13px;">
                      ✉️ <a href="mailto:larry@buckalewfinancialservices.com" style="color: ${COMPANY_COLORS.secondary}; text-decoration: none;">larry@buckalewfinancialservices.com</a>
                    </p>
                    <p style="margin: 0; color: ${COMPANY_COLORS.textLight}; font-size: 13px;">
                      🌐 <a href="https://buckalew-financial.com" style="color: ${COMPANY_COLORS.secondary}; text-decoration: none;">buckalew-financial.com</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0; color: ${COMPANY_COLORS.textLight}; font-size: 12px;">
                      © ${new Date().getFullYear()} Buckalew Financial Services. All rights reserved.
                    </p>
                    <p style="margin: 10px 0 0; color: ${COMPANY_COLORS.textLight}; font-size: 11px;">
                      This email was sent to you regarding your account with Buckalew Financial Services.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Welcome email template
 */
export function getWelcomeEmail(name) {
  const content = `
    <h2 style="margin: 0 0 20px; color: ${COMPANY_COLORS.primary}; font-size: 24px;">
      Welcome to Buckalew Financial Services, ${name}!
    </h2>
    <p style="margin: 0 0 20px; color: ${COMPANY_COLORS.text}; font-size: 16px; line-height: 1.6;">
      Thank you for choosing us as your trusted insurance and financial partner. We're committed to helping you protect what matters most and achieve your financial goals.
    </p>
    <p style="margin: 0 0 30px; color: ${COMPANY_COLORS.text}; font-size: 16px; line-height: 1.6;">
      Our team of experienced professionals is here to provide you with personalized service and expert guidance every step of the way.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 30px;">
      <tr>
        <td align="center">
          <a href="https://buckalew-financial.com/dashboard" class="button" style="background-color: ${COMPANY_COLORS.secondary}; color: ${COMPANY_COLORS.white}; text-decoration: none; padding: 16px 32px; border-radius: 8px; display: inline-block; font-weight: 600;">
            Access Your Dashboard
          </a>
        </td>
      </tr>
    </table>
    <div style="background-color: ${COMPANY_COLORS.background}; padding: 20px; border-radius: 8px; border-left: 4px solid ${COMPANY_COLORS.accent};">
      <h3 style="margin: 0 0 15px; color: ${COMPANY_COLORS.primary}; font-size: 18px;">
        What's Next?
      </h3>
      <ul style="margin: 0; padding-left: 20px; color: ${COMPANY_COLORS.text}; font-size: 15px; line-height: 1.8;">
        <li>Complete your profile for personalized recommendations</li>
        <li>Browse our insurance products and services</li>
        <li>Schedule a free consultation with our team</li>
        <li>Get instant quotes for coverage that fits your needs</li>
      </ul>
    </div>
  `;

  return getEmailWrapper(content, `Welcome to Buckalew Financial Services, ${name}!`);
}

/**
 * Quote received confirmation email
 */
export function getQuoteReceivedEmail(name, quoteId) {
  const content = `
    <h2 style="margin: 0 0 20px; color: ${COMPANY_COLORS.primary}; font-size: 24px;">
      We've Received Your Quote Request!
    </h2>
    <p style="margin: 0 0 20px; color: ${COMPANY_COLORS.text}; font-size: 16px; line-height: 1.6;">
      Hi ${name},
    </p>
    <p style="margin: 0 0 30px; color: ${COMPANY_COLORS.text}; font-size: 16px; line-height: 1.6;">
      Thank you for requesting a quote from Buckalew Financial Services. Our team is reviewing your information and will get back to you within 24 business hours with a personalized quote.
    </p>
    <div style="background-color: ${COMPANY_COLORS.background}; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
        <tr>
          <td style="padding-bottom: 12px;">
            <span style="color: ${COMPANY_COLORS.textLight}; font-size: 14px;">Quote Reference #:</span>
          </td>
          <td align="right" style="padding-bottom: 12px;">
            <span style="color: ${COMPANY_COLORS.primary}; font-weight: 600; font-size: 16px;">${quoteId}</span>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: 12px;">
            <span style="color: ${COMPANY_COLORS.textLight}; font-size: 14px;">Status:</span>
          </td>
          <td align="right" style="padding-bottom: 12px;">
            <span style="background-color: ${COMPANY_COLORS.accent}; color: ${COMPANY_COLORS.white}; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">PENDING REVIEW</span>
          </td>
        </tr>
        <tr>
          <td>
            <span style="color: ${COMPANY_COLORS.textLight}; font-size: 14px;">Expected Response:</span>
          </td>
          <td align="right">
            <span style="color: ${COMPANY_COLORS.text}; font-weight: 600; font-size: 14px;">Within 24 hours</span>
          </td>
        </tr>
      </table>
    </div>
    <p style="margin: 0 0 20px; color: ${COMPANY_COLORS.text}; font-size: 15px; line-height: 1.6;">
      In the meantime, feel free to explore our resources or reach out with any questions.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
      <tr>
        <td align="center">
          <a href="https://buckalew-financial.com/quotes/${quoteId}" class="button" style="background-color: ${COMPANY_COLORS.secondary}; color: ${COMPANY_COLORS.white}; text-decoration: none; padding: 16px 32px; border-radius: 8px; display: inline-block; font-weight: 600;">
            Track Your Quote
          </a>
        </td>
      </tr>
    </table>
  `;

  return getEmailWrapper(content, `Your quote request has been received - Ref #${quoteId}`);
}

/**
 * Password reset email
 */
export function getPasswordResetEmail(name, resetLink, expiresIn = '1 hour') {
  const content = `
    <h2 style="margin: 0 0 20px; color: ${COMPANY_COLORS.primary}; font-size: 24px;">
      Password Reset Request
    </h2>
    <p style="margin: 0 0 20px; color: ${COMPANY_COLORS.text}; font-size: 16px; line-height: 1.6;">
      Hi ${name},
    </p>
    <p style="margin: 0 0 30px; color: ${COMPANY_COLORS.text}; font-size: 16px; line-height: 1.6;">
      We received a request to reset your password for your Buckalew Financial Services account. Click the button below to create a new password.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 30px;">
      <tr>
        <td align="center">
          <a href="${resetLink}" class="button" style="background-color: ${COMPANY_COLORS.secondary}; color: ${COMPANY_COLORS.white}; text-decoration: none; padding: 16px 32px; border-radius: 8px; display: inline-block; font-weight: 600;">
            Reset My Password
          </a>
        </td>
      </tr>
    </table>
    <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid ${COMPANY_COLORS.accent}; margin-bottom: 20px;">
      <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
        ⚠️ <strong>Important:</strong> This link will expire in ${expiresIn}. If you didn't request this reset, please ignore this email or contact us immediately.
      </p>
    </div>
    <p style="margin: 0; color: ${COMPANY_COLORS.textLight}; font-size: 13px; line-height: 1.6;">
      If the button doesn't work, copy and paste this link into your browser:<br>
      <a href="${resetLink}" style="color: ${COMPANY_COLORS.secondary}; word-break: break-all;">${resetLink}</a>
    </p>
  `;

  return getEmailWrapper(content, `Reset your password for Buckalew Financial Services`);
}

/**
 * Appointment confirmation email
 */
export function getAppointmentConfirmationEmail(name, appointmentDetails) {
  const { date, time, type, with: consultantName } = appointmentDetails;
  
  const content = `
    <h2 style="margin: 0 0 20px; color: ${COMPANY_COLORS.success}; font-size: 24px;">
      ✓ Appointment Confirmed
    </h2>
    <p style="margin: 0 0 20px; color: ${COMPANY_COLORS.text}; font-size: 16px; line-height: 1.6;">
      Hi ${name},
    </p>
    <p style="margin: 0 0 30px; color: ${COMPANY_COLORS.text}; font-size: 16px; line-height: 1.6;">
      Your appointment with Buckalew Financial Services has been confirmed! We look forward to speaking with you.
    </p>
    <div style="background-color: ${COMPANY_COLORS.background}; padding: 30px; border-radius: 8px; margin-bottom: 30px; border: 2px solid ${COMPANY_COLORS.success};">
      <h3 style="margin: 0 0 20px; color: ${COMPANY_COLORS.primary}; font-size: 18px; text-align: center;">
        📅 Appointment Details
      </h3>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
            <span style="color: ${COMPANY_COLORS.textLight}; font-size: 14px;">Date:</span>
          </td>
          <td align="right" style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
            <span style="color: ${COMPANY_COLORS.text}; font-weight: 600; font-size: 15px;">${date}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
            <span style="color: ${COMPANY_COLORS.textLight}; font-size: 14px;">Time:</span>
          </td>
          <td align="right" style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
            <span style="color: ${COMPANY_COLORS.text}; font-weight: 600; font-size: 15px;">${time}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
            <span style="color: ${COMPANY_COLORS.textLight}; font-size: 14px;">Type:</span>
          </td>
          <td align="right" style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
            <span style="color: ${COMPANY_COLORS.text}; font-weight: 600; font-size: 15px;">${type}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0;">
            <span style="color: ${COMPANY_COLORS.textLight}; font-size: 14px;">With:</span>
          </td>
          <td align="right" style="padding: 12px 0;">
            <span style="color: ${COMPANY_COLORS.text}; font-weight: 600; font-size: 15px;">${consultantName}</span>
          </td>
        </tr>
      </table>
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 20px;">
      <tr>
        <td align="center">
          <a href="https://buckalew-financial.com/appointments" class="button" style="background-color: ${COMPANY_COLORS.secondary}; color: ${COMPANY_COLORS.white}; text-decoration: none; padding: 16px 32px; border-radius: 8px; display: inline-block; font-weight: 600; margin-right: 10px;">
            View Appointment
          </a>
          <a href="https://buckalew-financial.com/appointments/reschedule" style="background-color: transparent; border: 2px solid ${COMPANY_COLORS.secondary}; color: ${COMPANY_COLORS.secondary}; text-decoration: none; padding: 14px 30px; border-radius: 8px; display: inline-block; font-weight: 600;">
            Reschedule
          </a>
        </td>
      </tr>
    </table>
    <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; border-left: 4px solid ${COMPANY_COLORS.secondary};">
      <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.6;">
        💡 <strong>Tip:</strong> Please have any relevant documents ready for review during your appointment.
      </p>
    </div>
  `;

  return getEmailWrapper(content, `Your appointment is confirmed for ${date} at ${time}`);
}

module.exports = {
  getWelcomeEmail,
  getQuoteReceivedEmail,
  getPasswordResetEmail,
  getAppointmentConfirmationEmail,
  COMPANY_COLORS,
};
