/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during builds to allow deployment
    ignoreDuringBuilds: true
  },
  typescript: {
    // Disable TypeScript errors during builds if needed
    // ignoreBuildErrors: true
  }
}

module.exports = nextConfig 