/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["scontent.cdninstagram.com"],
  },
};

module.exports = nextConfig;
