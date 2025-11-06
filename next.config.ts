/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // optional if you want to skip TS errors too
  },
   images: {
    domains: ['blog-app-neew.vercel.app', 'i.pravatar.cc'],
  },
};

module.exports = nextConfig;
