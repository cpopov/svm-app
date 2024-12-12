/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: config => {
    config.externals.push(
      'pino-pretty' /* add any other modules that might be causing the error */
    )
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.sportvalue.app',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'media.api-sports.io',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
// livedataprod.stocksfc.com
