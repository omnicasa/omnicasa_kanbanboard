import type { NextConfig } from "next";

module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.omnicasaassets.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "epclabel.omnicasa.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cloud-storage.omnicasa.com",
        port: "",
        pathname: "/**",
      },
      // Add more patterns as needed
    ],
  },
};

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
