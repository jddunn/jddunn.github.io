/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  reactStrictMode: true,
  output: isProd ? 'export' : undefined,
  assetPrefix: isProd ? 'https://jddunn.github.io' : '',
  basePath: '',
  trailingSlash: true,
  images: { unoptimized: true },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This will allow the build to succeed even with TS errors
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
