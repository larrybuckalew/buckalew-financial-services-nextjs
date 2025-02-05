import { MFAService } from '../src/lib/auth/mfaService';
import { authenticator } from 'otplib';

describe('Multi-Factor Authentication Service', () => {
  let testSecret: string;

  beforeEach(() => {
    // Generate a test secret before each test
    testSecret = authenticator.generateSecret();
  });

  test('generates a valid MFA secret', () => {
    const mfaSetup = MFAService.generateMFASecret();
    
    expect(mfaSetup.secret).toBeTruthy();
    expect(mfaSetup.qrCode).toContain('otpauth://totp/Buckalew:Buckalew');
  });

  test('verifies a valid MFA token', () => {
    // Generate a token
    const token = authenticator.generate(testSecret);
    
    // Verify the token
    const isValid = MFAService.verifyMFAToken(testSecret, token);
    
    expect(isValid).toBeTruthy();
  });

  test('rejects an invalid MFA token', () => {
    const invalidToken = '000000';
    
    const isValid = MFAService.verifyMFAToken(testSecret, invalidToken);
    
    expect(isValid).toBeFalsy();
  });

  test('generates unique recovery codes', () => {
    const recoveryCodes = MFAService.generateRecoveryCodes();
    
    expect(recoveryCodes.length).toBe(5);
    
    // Ensure codes are unique
    const uniqueCodes = new Set(recoveryCodes);
    expect(uniqueCodes.size).toBe(5);
  });
});
