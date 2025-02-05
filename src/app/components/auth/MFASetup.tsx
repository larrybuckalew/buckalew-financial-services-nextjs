import React, { useState, useEffect } from 'react';
import { MFAService } from '@/services/mfaService';
import { ErrorHandler } from '@/lib/errors/errorHandler';

interface MFASetupProps {
  userId: string;
  email: string;
}

const MFASetup: React.FC<MFASetupProps> = ({ userId, email }) => {
  const [mfaSecret, setMfaSecret] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [verificationToken, setVerificationToken] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Generate MFA secret on component mount
    const generateSecret = async () => {
      try {
        const { secret, qrCodeUrl } = MFAService.generateMFASecret({ 
          id: userId, 
          email 
        });
        setMfaSecret(secret);
        setQrCodeUrl(qrCodeUrl);
      } catch (err) {
        setError('Failed to generate MFA secret');
      }
    };

    generateSecret();
  }, [userId, email]);

  const handleEnableMFA = async () => {
    if (!mfaSecret) {
      setError('MFA secret not generated');
      return;
    }

    try {
      const response = await fetch('/api/auth/mfa/enable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          secret: mfaSecret,
          token: verificationToken
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setBackupCodes(data.backupCodes || []);
      } else {
        setError(data.message || 'Failed to enable MFA');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  if (success) {
    return (
      <div className="bg-green-100 p-4 rounded">
        <h2 className="text-green-800 font-bold">
          Two-Factor Authentication Enabled
        </h2>
        <div>
          <p>Backup Codes (save these!):</p>
          <ul>
            {backupCodes.map((code, index) => (
              <li key={index}>{code}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Set Up Two-Factor Authentication
      </h2>

      {qrCodeUrl && (
        <div className="mb-4">
          <p className="mb-2">
            Scan this QR code with your authenticator app
          </p>
          <img 
            src={qrCodeUrl} 
            alt="MFA QR Code" 
            className="mx-auto"
          />
        </div>
      )}

      <div className="mb-4">
        <label 
          htmlFor="verification-token" 
          className="block mb-2"
        >
          Enter 6-digit verification code
        </label>
        <input
          type="text"
          id="verification-token"
          value={verificationToken}
          onChange={(e) => setVerificationToken(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter 6-digit code"
        />
      </div>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      <button
        onClick={handleEnableMFA}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Enable Two-Factor Authentication
      </button>
    </div>
  );
};

export default MFASetup;
