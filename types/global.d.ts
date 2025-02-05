declare module '@/lib/auth' {
  export function registerUser(userData: any): Promise<any>;
  export function validatePassword(password: string): boolean;
  export function initiatePasswordReset(email: string): Promise<any>;
  export function verifyEmail(token: string): Promise<any>;
}

declare module '@/lib/socket' {
  export function initSocketServer(): any;
  export function emitToUser(userId: string, event: string, data: any): void;
}

declare module '@prisma/client' {
  interface Profile {
    id: string;
    userId: string;
  }

  interface PrismaClient {
    profile: {
      findUnique: (args: any) => Promise<Profile | null>;
      update: (args: any) => Promise<Profile>;
      groupBy: (args: any) => Promise<any[]>;
      count: (args: any) => Promise<number>;
    };
  }
}

// Existing type declarations
declare module 'dompurify';
declare module 'rate-limiter-flexible';
declare module 'ws';
declare module 'class-variance-authority';
declare module 'pino';
declare module '@next-auth/prisma-adapter';
declare module '@sentry/nextjs';
declare module '@sentry/tracing';
declare module 'socket.io';
declare module 'nodemailer';
declare module 'vitest';

// Custom type for notifications
type NotificationType = {
  id: string;
  read: boolean;
};

// Extend window object for custom types
interface Window {
  fs: {
    readFile: (path: string, options?: { encoding?: string }) => Promise<Uint8Array>;
  };
}
