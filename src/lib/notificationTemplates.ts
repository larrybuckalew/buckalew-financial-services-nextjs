interface TemplateData {
  [key: string]: string | number | boolean;
}

const templates = {
  PROFILE_UPDATE: {
    title: 'Profile Updated',
    message: (data: TemplateData) =>
      `Your profile has been successfully updated. ${data.changedFields ? `Updated fields: ${data.changedFields}` : ''}`
  },
  INVESTMENT_UPDATE: {
    title: 'Investment Update',
    message: (data: TemplateData) =>
      `Your investment portfolio has been updated. New risk profile: ${data.riskProfile}`
  },
  SECURITY_ALERT: {
    title: 'Security Alert',
    message: (data: TemplateData) =>
      `A login was detected from a new device. Location: ${data.location}, Device: ${data.device}`
  },
  SYSTEM_UPDATE: {
    title: 'System Update',
    message: (data: TemplateData) =>
      `${data.message || 'System has been updated with new features.'}`
  },
  PASSWORD_CHANGED: {
    title: 'Password Changed',
    message: () =>
      'Your password has been successfully changed. If you did not make this change, please contact support immediately.'
  },
  ACCOUNT_VERIFIED: {
    title: 'Account Verified',
    message: () =>
      'Your account has been successfully verified. You now have full access to all features.'
  },
  RISK_ASSESSMENT_COMPLETED: {
    title: 'Risk Assessment Complete',
    message: (data: TemplateData) =>
      `Your risk assessment has been completed. Your profile is: ${data.riskProfile}. This will help us provide better investment recommendations.`
  },
  DOCUMENT_UPLOADED: {
    title: 'Document Uploaded',
    message: (data: TemplateData) =>
      `A new document has been uploaded to your account: ${data.documentName}`
  },
  ADVISOR_ASSIGNED: {
    title: 'Financial Advisor Assigned',
    message: (data: TemplateData) =>
      `${data.advisorName} has been assigned as your financial advisor. They will be in touch with you soon.`
  },
  MEETING_SCHEDULED: {
    title: 'Meeting Scheduled',
    message: (data: TemplateData) =>
      `Your meeting has been scheduled for ${data.date} at ${data.time} with ${data.advisorName}.`
  }
};

export function getNotificationTemplate(type: string, data: TemplateData = {}) {
  const template = templates[type as keyof typeof templates];
  if (!template) {
    throw new Error(`Template not found for type: ${type}`);
  }

  return {
    title: template.title,
    message: template.message(data)
  };
}

export function getEmailTemplate(type: string, data: TemplateData = {}) {
  const { title, message } = getNotificationTemplate(type, data);

  return {
    subject: title,
    text: message,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #2563eb; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">${title}</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #e5e7eb;">
          <p style="font-size: 16px; line-height: 1.5; color: #374151;">${message}</p>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              You can view this notification and manage your preferences in your dashboard.
            </p>
          </div>
        </div>
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center;">
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            © ${new Date().getFullYear()} Buckalew Financial Services. All rights reserved.
          </p>
        </div>
      </div>
    `
  };
}