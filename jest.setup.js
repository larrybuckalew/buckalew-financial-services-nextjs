import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {},
  }),
}));

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: () => [null, false],
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// Setup environment variables for tests
process.env.NEXTAUTH_URL = 'http://localhost:3000';
process.env.NEXTAUTH_SECRET = 'test_secret';