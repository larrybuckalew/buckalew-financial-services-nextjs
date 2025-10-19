import crypto from 'crypto';
import { env } from '@/env.mjs'; // Assuming you have an environment config

const ENCRYPTION_ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16; // Initialization vector length
const SALT_LENGTH = 64; // Salt length
const TAG_LENGTH = 16; // Authentication tag length

interface EncryptedData {
  encrypted: string;
  iv: string;
  salt: string;
  tag: string;
}

export class EncryptionService {
  // Generate a secure encryption key from a password
  private static deriveKey(password: string, salt: Buffer): Buffer {
    return crypto.pbkdf2Sync(
      password, 
      salt, 
      100000, // iterations
      32, // key length
      'sha512'
    );
  }

  // Encrypt sensitive data
  static encrypt(data: string, secretKey: string): EncryptedData {
    // Generate a random salt
    const salt = crypto.randomBytes(SALT_LENGTH);
    
    // Derive a key from the secret key and salt
    const key = this.deriveKey(secretKey, salt);
    
    // Generate a random initialization vector
    const iv = crypto.randomBytes(IV_LENGTH);
    
    // Create cipher
    const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, key, iv);
    
    // Encrypt the data
    const encrypted = Buffer.concat([
      cipher.update(data, 'utf8'),
      cipher.final()
    ]);
    
    // Get the authentication tag
    const tag = cipher.getAuthTag();
    
    return {
      encrypted: encrypted.toString('base64'),
      iv: iv.toString('base64'),
      salt: salt.toString('base64'),
      tag: tag.toString('base64')
    };
  }

  // Decrypt sensitive data
  static decrypt(encryptedData: EncryptedData, secretKey: string): string {
    // Convert base64 strings back to buffers
    const salt = Buffer.from(encryptedData.salt, 'base64');
    const iv = Buffer.from(encryptedData.iv, 'base64');
    const encrypted = Buffer.from(encryptedData.encrypted, 'base64');
    const tag = Buffer.from(encryptedData.tag, 'base64');
    
    // Derive the key
    const key = this.deriveKey(secretKey, salt);
    
    // Create decipher
    const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, key, iv);
    decipher.setAuthTag(tag);
    
    // Decrypt the data
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final()
    ]);
    
    return decrypted.toString('utf8');
  }

  // Hash a password with salt
  static hashPassword(password: string): { hash: string; salt: string } {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(
      password, 
      salt, 
      1000, // iterations
      64, // key length
      'sha512'
    ).toString('hex');
    
    return { hash, salt };
  }

  // Verify a password against a stored hash
  static verifyPassword(
    storedHash: string, 
    storedSalt: string, 
    providedPassword: string
  ): boolean {
    const hash = crypto.pbkdf2Sync(
      providedPassword, 
      storedSalt, 
      1000, // iterations
      64, // key length
      'sha512'
    ).toString('hex');
    
    return hash === storedHash;
  }

  // Generate a secure random token
  static generateSecureToken(length = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }
}

// Sensitive data encryption utility
export function encryptSensitiveData(data: string) {
  return EncryptionService.encrypt(
    data, 
    env.ENCRYPTION_SECRET_KEY
  );
}

// Sensitive data decryption utility
export function decryptSensitiveData(encryptedData: EncryptedData) {
  return EncryptionService.decrypt(
    encryptedData, 
    env.ENCRYPTION_SECRET_KEY
  );
}
