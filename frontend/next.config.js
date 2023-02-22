/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    '@tradex/core',
    '@tradex/icons',
    '@tradex/interface',
    '@tradex/contracts',
    '@tradex/languages',
  ],
  i18n: {
    locales: ['pt', 'us'],
    defaultLocale: 'us',
    localeDetection: true,
  },
}

module.exports = nextConfig
