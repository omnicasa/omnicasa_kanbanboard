import type { NextConfig } from "next";
import dotenv from "dotenv";
dotenv.config();

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
      // Add more patterns as needed
    ],
  },
  env: {
    OAUTH_TOKEN: process.env.OAUTH_TOKEN,
    BASE_URL: process.env.BASE_URL,
  },
};

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
