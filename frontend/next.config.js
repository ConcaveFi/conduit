/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@tradex/core', '@tradex/icons', '@tradex/interface', '@tradex/languages'],
  // i18n: {
  //   locales: ['br', 'us', 'ja', 'ch', 'ru', 'ko', 'es', 'pt', 'ar', 'de'],
  //   defaultLocale: 'us',
  //   localeDetection: true,
  // },
  async rewrites() {
    return [{ source: '/', destination: '/sETH' }]
  },
  experimental: {
    appDir: true,
    typedRoutes: true,
    // swcPlugins: [
    //   ['@swc-jotai/react-refresh', {}],
    //   ['next-superjson-plugin', {}],
    // ],
  },
}

module.exports = nextConfig
