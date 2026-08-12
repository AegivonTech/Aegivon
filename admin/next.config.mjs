/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://aegivon-9sc9-eight.vercel.app'}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
