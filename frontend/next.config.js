/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@exchange/core', '@exchange/icons', '@exchange/interface'],
}

module.exports = nextConfig
