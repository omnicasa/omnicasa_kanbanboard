import type { NextConfig } from "next";
require("dotenv").config();

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.omnicasaassets.com"],
  },
  env: {
    OAUTH_TOKEN: process.env.OAUTH_TOKEN,
  },
};

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
