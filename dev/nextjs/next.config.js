const {
  default: TypiaGenerationPlugin,
} = require("@achamaro/typia-utils/webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.plugins.push(new TypiaGenerationPlugin());
    return config;
  },
};

module.exports = nextConfig;
