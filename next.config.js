/** @type {import('next').NextConfig} */

const repo = 'jddunn.github.io'
const assetPrefix = `https://jddunn.github.io/`
// const basePath = `/${repo}`0

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // publicPath: "/jddunn.github.io",
  // basePath: '/',
  // basePath: basePath,
  // assetPrefix: assetPrefix,
  trailingSlash: true,
  images: { unoptimized: true }
}

module.exports = nextConfig
