const createNextIntlPlugin = require('next-intl/plugin');

// Apunta al archivo de configuración request
const withNextIntl = createNextIntlPlugin('./request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    formats: ['image/webp'],
  },
  // Optimización de producción
  swcMinify: true,
}

module.exports = withNextIntl(nextConfig);
