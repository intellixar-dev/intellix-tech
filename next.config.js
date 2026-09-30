/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: { root: __dirname },
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
    position: 'bottom-right',
  },
}

module.exports = nextConfig
