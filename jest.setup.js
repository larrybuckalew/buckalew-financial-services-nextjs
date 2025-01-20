import '@testing-library/jest-dom/extend-expect';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
    };
  },
}));

// Mock NextAuth
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: null,
    status: 'unauthenticated'
  }),
  getSession: () => null,
  signIn: jest.fn(),
  signOut: jest.fn()
}));

// Fail tests on any warning
console.error = (message) => {
  throw new Error(message);
};