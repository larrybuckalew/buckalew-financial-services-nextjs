export const config = {
  auth: {
    jwtSecret: process.env.JWT_SECRET!,
    tokenExpiration: '7d',
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  },
  database: {
    url: process.env.DATABASE_URL!,
  },
};