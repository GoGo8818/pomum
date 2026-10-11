/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    // Redigeringspanelet ligger i public/admin/index.html og åpnes på /admin
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
};

module.exports = nextConfig;
