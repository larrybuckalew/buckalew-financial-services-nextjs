/** @type {import('next').NextConfig} */
const { withSentry } = require('@sentry/nextjs');

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  
  // Performance Optimizations
  experimental: {
    optimizeCss: true,
    optimizeServerReact: true,
    serverComponentsExternalPackages: ['mongoose'],
    optimizePackageImports: ['@/lib/monitoring', '@/lib/cache']
  },
  
  // Security Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
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
  
  // Webpack Performance and Security Optimizations
  webpack: (config, { isServer }) => {
    // Chunk splitting and optimization
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /[\/]node_modules[\/]/,
            priority: -10,
            name: 'vendors'
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      };

      // Security: prevent access to Node.js core modules on client-side
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