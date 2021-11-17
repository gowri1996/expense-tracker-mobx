const { addWebpackPlugin, override } = require("customize-cra");
const zlib = require("zlib");

const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  webpack: override(
    addWebpackPlugin(
      new CompressionPlugin({
        filename: "[path][base].br",
        algorithm: "brotliCompress",
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        threshold: 0,
        minRatio: 1,
        deleteOriginalAssets: false,
      })
    ),
    addWebpackPlugin(
      new CompressionPlugin({
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: /\.(js|css|html|svg)$/,
        threshold: 0,
        minRatio: 1,
        deleteOriginalAssets: false,
      })
    )
  ),
};
