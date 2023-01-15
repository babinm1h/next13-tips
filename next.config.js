const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "styles/variables.scss";`,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@pages": path.resolve(__dirname, "pages"),
      "@assets": path.resolve(__dirname, "assets"),
      "@styles": path.resolve(__dirname, "styles"),
      "@components": path.resolve(__dirname, "src", "components"),
      "@ts": path.resolve(__dirname, "src", "types"),
      "@src": path.resolve(__dirname, "src"),
    };

    return config;
  },
};

module.exports = nextConfig;
