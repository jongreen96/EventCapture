/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
      },
      {
        hostname: '275f3b7d5dc1ccc88cb37def555b11ac.r2.cloudflarestorage.com',
      },
    ],
  },
  output: 'standalone',
};

export default nextConfig;
