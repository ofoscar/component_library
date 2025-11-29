import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Railway-specific configurations
  serverExternalPackages: [],
  // Handle Railway's environment
  env: {
    RAILWAY_ENVIRONMENT: process.env.RAILWAY_ENVIRONMENT || 'development',
  },
  // Ensure proper asset handling on Railway
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : undefined,
};

export default nextConfig;
