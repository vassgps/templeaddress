/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Turbopack is default in Next.js 16 dev. For build, Turbopack is stable.
  // Proxy (replaces middleware in Next.js 16) goes in proxy.ts when needed.
  images: {
    // Add your image domains here when moving to real assets
    remotePatterns: [{ protocol: 'https', hostname: 'fonts.googleapis.com' }],
  },
  // Allow CSS imports from node_modules (recharts uses them)
  transpilePackages: ['recharts'],
  // Partial Prerendering — renamed from experimental.ppr in Next.js 16.4
  cacheComponents: true,
  partialPrefetching: true,
  async rewrites() {
    const backend = process.env.TEMPLEADDRESS_API_URL || 'http://127.0.0.1:8000'
    return [{ source: '/api/backend/:path*', destination: `${backend}/api/v1/:path*` }]
  },
}

export default nextConfig
