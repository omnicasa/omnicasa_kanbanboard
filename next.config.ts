import type { NextConfig } from "next";
import dotenv from "dotenv";
dotenv.config();

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.omnicasaassets.com"],
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
