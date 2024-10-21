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
};

export default nextConfig;
