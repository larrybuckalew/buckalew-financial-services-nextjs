import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import { configure } from '@testing-library/react';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

configure({ testIdAttribute: 'data-testid' });

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
}));