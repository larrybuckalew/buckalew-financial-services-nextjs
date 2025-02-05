import { createMocks } from 'node-mocks-http';
import handlePolicies from '@/pages/api/policies';
import { prisma } from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    policy: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe('/api/policies', () => {
  it('returns policies list for GET request', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    const mockPolicies = [
      {
        id: '1',
        policyNumber: 'POL123',
        type: 'MEDICARE_ADVANTAGE',
        carrier: 'Blue Cross',
      },
    ];

    (prisma.policy.findMany as jest.Mock).mockResolvedValueOnce(mockPolicies);

    await handlePolicies(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockPolicies);
  });

  it('creates new policy for POST request', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        policyNumber: 'POL123',
        type: 'MEDICARE_ADVANTAGE',
        carrier: 'Blue Cross',
        premium: 150.00,
        clientId: 'client123',
      },
    });

    const mockCreatedPolicy = {
      id: '1',
      ...req.body,
    };

    (prisma.policy.create as jest.Mock).mockResolvedValueOnce(mockCreatedPolicy);

    await handlePolicies(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData())).toEqual(mockCreatedPolicy);
  });
});