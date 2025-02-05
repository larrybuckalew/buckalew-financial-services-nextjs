import React from 'react';

interface BaseEmailLayoutProps {
  previewText?: string;
  children: React.ReactNode;
  footerContent?: React.ReactNode;
  trackingId?: string;
}

export const BaseEmailLayout: React.FC<BaseEmailLayoutProps> = ({
  previewText,
  children,
  footerContent,
  trackingId
}) => {
  const trackingPixel = trackingId ? 
    `${process.env.NEXT_PUBLIC_APP_URL}/api/email/track/${trackingId}.png` : null;

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {previewText && (
          <meta name="description" content={previewText} />
        )}
        <title>Buckalew Financial Services</title>
      </head>
      <body style={{
        margin: '0',
        padding: '0',
        backgroundColor: '#f6f9fc',
        fontFamily: 'Arial, sans-serif'
      }}>
        <table cellPadding="0" cellSpacing="0" style={{
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderCollapse: 'collapse'
        }}>
          <tr>
            <td style={{ padding: '20px' }}>
              <img 
                src="{process.env.NEXT_PUBLIC_APP_URL}/images/logo.png" 
                alt="Buckalew Financial Services"
                style={{ maxWidth: '200px', marginBottom: '20px' }}
              />
            </td>
          </tr>
          
          <tr>
            <td style={{ padding: '20px' }}>
              {children}
            </td>
          </tr>

          <tr>
            <td style={{
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderTop: '1px solid #e9ecef'
            }}>
              {footerContent || (
                <>
                  <p style={{ 
                    margin: '0 0 10px 0',
                    fontSize: '14px',
                    color: '#6c757d'
                  }}>
                    Best regards,<br />
                    Buckalew Financial Services Team
                  </p>
                  <p style={{ 
                    margin: '0',
                    fontSize: '12px',
                    color: '#6c757d'
                  }}>
                    This email was sent by Buckalew Financial Services.<br />
                    123 Main Street, Suite 100, Anytown, USA
                  </p>
                </>
              )}
            </td>
          </tr>
        </table>
        {trackingPixel && (
          <img 
            src={trackingPixel} 
            alt="" 
            width="1" 
            height="1" 
            style={{ display: 'none' }} 
          />
        )}
      </body>
    </html>
  );
};