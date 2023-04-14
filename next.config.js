/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/para/:path*",
        destination: "/cmDashboard",
        permanent: true,
      },
    ];
  },
};

module.exports = {
  nextConfig,
};
