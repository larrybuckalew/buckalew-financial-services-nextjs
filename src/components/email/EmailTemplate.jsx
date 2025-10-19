import React from 'react';
import { AppointmentReminderTemplate } from './templates/AppointmentReminder';
import { PolicyRenewalTemplate } from './templates/PolicyRenewal';
import { CommissionConfirmationTemplate } from './templates/CommissionConfirmation';
const templates = {
    'appointment-reminder': AppointmentReminderTemplate,
    'policy-renewal': PolicyRenewalTemplate,
    'commission-confirmation': CommissionConfirmationTemplate,
};
export const EmailTemplate = ({ templateName, data }) => {
    const Template = templates[templateName];
    if (!Template) {
        throw new Error(`Template ${templateName} not found`);
    }
    return (<html>
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body>
        <Template {...data}/>
      </body>
    </html>);
};
