/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/common-types"],
  reactStrictMode: true,
};

export default nextConfig;
