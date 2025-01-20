/** @type {import('next').NextConfig} */

const { withSentry } = require('@sentry/nextjs');
const helmet = require('helmet');

const nextConfig = {
  reactStrictMode: true,
  
  // Security Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },

  // Performance and Monitoring
  experimental: {
    optimizePackageImports: ['@/lib/monitoring', '@/lib/cache']
  },

  // Webpack customizations
  webpack: (config, { isServer }) => {
    // Add custom webpack configurations for performance and security
    if (!isServer) {
      config.resolve.fallback = { 
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false
      };
    }

    return config;
  },

  // Sentry Configuration
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
    hideSourceMaps: true
  }
};

module.exports = withSentry(nextConfig);
