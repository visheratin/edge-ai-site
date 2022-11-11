/** @type {import('next').NextConfig} */
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  reactStrictMode: true,
  //distDir: 'build',
  webpack: (config, { }) => {

    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.fallback = { fs: false };

    config.plugins.push(
      new NodePolyfillPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: './node_modules/onnxruntime-web/dist/ort-wasm.wasm',
            to: 'static/chunks/pages/demos',
          },
          {
            from: './node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm',
            to: 'static/chunks/pages/demos',
          },
          {
            from: './node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.wasm',
            to: 'static/chunks/pages/demos',
          },
          {
            from: './node_modules/onnxruntime-web/dist/ort-wasm-threaded.wasm',
            to: 'static/chunks/pages/demos',
          },
        ],
      }),
    );

    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}
