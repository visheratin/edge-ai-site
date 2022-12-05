/** @type {import('next').NextConfig} */
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  reactStrictMode: true,
  //distDir: 'build',
  webpack: (config, { }) => {

    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.fallback = { fs: false };

    config.plugins.push(
      new NodePolyfillPlugin()
    );

    config.module.rules.push({
      test: /\.ts$/,
      loader: "ts-loader",
    })

    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}
