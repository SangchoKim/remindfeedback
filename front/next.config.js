const withImages = require("next-images");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
require("dotenv").config();
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withImages({
  webpack(config, option) {
    return config;
  },
});

module.exports = withBundleAnalyzer(
  withImages({
    env: {
      PASSWORD: process.env.REACT_APP_PASSWORD,
    },
    distDir: ".next",
    webpack(config, { isServer }) {
      const prod = process.env.NODE_ENV === "production";

      const plugins = [
        ...config.plugins,
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
      ];

      if (prod) {
        plugins.push(new CompressionPlugin()); // main.js.gz
      }
      return {
        ...config,
        mode: prod ? "production" : "development",
        devtool: prod ? "hidden-source-map" : "eval",
        module: {
          ...config.module,
          rules: [
            ...config.module.rules,
            {
              loader: "webpack-ant-icon-loader",
              enforce: "pre",
              include: [require.resolve("@ant-design/icons")],
            },
          ],
        },
        plugins,
      };
    },
  })
);
