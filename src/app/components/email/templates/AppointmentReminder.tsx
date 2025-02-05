import React from 'react';

interface AppointmentReminderProps {
  clientName: string;
  date: Date;
  time: string;
  type: string;
}

export const AppointmentReminderTemplate: React.FC<AppointmentReminderProps> = ({
  clientName,
  date,
  time,
  type
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
    <h1 style={{ color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
      Appointment Reminder
    </h1>
    
    <p style={{ fontSize: '16px', lineHeight: '1.5' }}>Dear {clientName},</p>
    
    <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
      This is a reminder of your upcoming {type} appointment:
    </p>
    
    <div style={{ 
      background: '#f9f9f9',
      padding: '20px',
      borderRadius: '5px',
      margin: '20px 0'
    }}>
      <p style={{ margin: '10px 0' }}>
        <strong>Date:</strong> {new Date(date).toLocaleDateString()}
      </p>
      <p style={{ margin: '10px 0' }}>
        <strong>Time:</strong> {time}
      </p>
      <p style={{ margin: '10px 0' }}>
        <strong>Type:</strong> {type}
      </p>
    </div>
    
    <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
      Please let us know if you need to reschedule or have any questions.
    </p>
    
    <div style={{ 
      marginTop: '30px',
      padding: '20px',
      borderTop: '1px solid #eee',
      fontSize: '14px',
      color: '#666'
    }}>
      <p>Best regards,</p>
      <p>Buckalew Financial Services</p>
    </div>
  </div>
);