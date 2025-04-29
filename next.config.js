/** @type {import('next').NextConfig} */

const repo = 'jddunn.github.io'
const assetPrefix = `https://jddunn.github.io/`
// const basePath = `/${repo}`0

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // publicPath: "/jddunn.github.io",
  assetPrefix: 'https://jddunn.github.io',
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
