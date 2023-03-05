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
    locales: ['br', 'us', 'ja', 'ch', 'ru', 'ko', 'es', 'pt', 'ar', 'de'],
    defaultLocale: 'us',
    localeDetection: true,
  },
  experimental: {
    appDir: true,
    typedRoutes: true,
    swcPlugins: [['next-superjson-plugin', {}]],
  },
}

module.exports = nextConfig
