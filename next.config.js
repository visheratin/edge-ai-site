/** @type {import('next').NextConfig} */
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
// const WorkboxPlugin = require('workbox-webpack-plugin');
// const CopyPlugin = require("copy-webpack-plugin");
// const WorkerPlugin = require('worker-plugin')

module.exports = {
  reactStrictMode: true,
  experimental: {
    transpilePackages: ['@visheratin/web-ai'],
  },
  webpack: (config, { }) => {

    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.fallback = { 
      fs: false,
    };

    config.plugins.push(
      new NodePolyfillPlugin(),
    );

    config.module.rules.push({
      test: /\.ts$/,
      loader: "ts-loader",
    });

    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}
