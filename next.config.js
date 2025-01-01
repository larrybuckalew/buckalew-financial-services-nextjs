/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  
  // Sentry Configuration
  sentry: {
    // Additional configuration options
    disableServerWebpackPlugin: false,
    disableClientWebpackPlugin: false,
    hideSourceMaps: true,
    widenClientFileUpload: true,
  },

  // Performance Optimizations
  experimental: {
    optimizeCss: true,
    optimizeServerReact: true,
    serverComponentsExternalPackages: ['mongoose']
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
          }
        ]
      }
    ];
  },

  // Webpack Performance Optimizations
  webpack: (config, { isServer }) => {
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
    }
    return config;
  }
};

module.exports = withSentryConfig(nextConfig, {
  // Additional Sentry webpack plugin settings
  silent: true,
  org: "buckalew-financial-services",
  project: "web-app"
});