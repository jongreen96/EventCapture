/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
      },
      {
        hostname: 'images.event-capture.jongreen.dev',
      },
    ],
  },
  output: 'standalone',
};

export default nextConfig;
