/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.1.108'],
  async rewrites() {
    return [
      {
        source: '/api/images/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/images/:path*`,
      },
    ];
  },
};

export default nextConfig;
