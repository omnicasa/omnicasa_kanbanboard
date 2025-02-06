import type { NextConfig } from "next";
require("dotenv").config();

module.exports = {
  // Your existing Next.js configuration
  env: {
    OAUTH_TOKEN: process.env.OAUTH_TOKEN,
  },
};

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
