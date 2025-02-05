import React from 'react';

interface PolicyRenewalProps {
  clientName: string;
  policyNumber: string;
  renewalDate: Date;
  carrier: string;
}

export const PolicyRenewalTemplate: React.FC<PolicyRenewalProps> = ({
  clientName,
  policyNumber,
  renewalDate,
  carrier
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
    <h1 style={{ color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
      Policy Renewal Notice
    </h1>
    
    <p style={{ fontSize: '16px', lineHeight: '1.5' }}>Dear {clientName},</p>
    
    <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
      This is a reminder that your policy with {carrier} is coming up for renewal.
    </p>
    
    <div style={{ 
      background: '#f9f9f9',
      padding: '20px',
      borderRadius: '5px',
      margin: '20px 0'
    }}>
      <p style={{ margin: '10px 0' }}>
        <strong>Policy Number:</strong> {policyNumber}
      </p>
      <p style={{ margin: '10px 0' }}>
        <strong>Carrier:</strong> {carrier}
      </p>
      <p style={{ margin: '10px 0' }}>
        <strong>Renewal Date:</strong> {new Date(renewalDate).toLocaleDateString()}
      </p>
    </div>
    
    <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
      Please contact us to review your coverage and discuss any changes you may need.
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