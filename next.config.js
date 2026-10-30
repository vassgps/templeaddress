import { apiRoot } from './lib/api-url.js'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'templeaddress-cloud.s3.amazonaws.com' },
      // Listing photos are also served from the bucket's regional endpoint.
      { protocol: 'https', hostname: 'templeaddress-cloud.s3.ap-south-1.amazonaws.com' },
      { protocol: 'https', hostname: 'fonts.googleapis.com' },
    ],
  },
  // Allow CSS imports from node_modules (recharts uses them)
  transpilePackages: ['recharts'],
  async rewrites() {
    const backend = process.env.TEMPLEADDRESS_API_URL || 'http://127.0.0.1:8000'
    return [{ source: '/api/backend/:path*', destination: `${apiRoot(backend)}/:path*` }]
  },
}

export default nextConfig
