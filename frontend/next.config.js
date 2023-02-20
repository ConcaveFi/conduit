/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@tradex/core', '@tradex/icons', '@tradex/interface', '@tradex/contracts'],
}

module.exports = nextConfig
