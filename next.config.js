/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'templeaddress-cloud.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'fonts.googleapis.com' },
    ],
  },
  // Allow CSS imports from node_modules (recharts uses them)
  transpilePackages: ['recharts'],
  async rewrites() {
    const backend = process.env.TEMPLEADDRESS_API_URL || 'http://127.0.0.1:8000'
    return [{ source: '/api/backend/:path*', destination: `${backend}/api/v1/:path*` }]
  },
}

export default nextConfig
