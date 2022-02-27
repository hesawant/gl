const commonConfig = require("./common.js");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");

module.exports = webpackMerge(commonConfig, {
  mode: "production",

  stats: "errors-only",

  plugins: [
    new webpack.DefinePlugin({
      WEBPACK_DEFINE_ENABLE_HMR: JSON.stringify(false),
      WEBPACK_DEFINE_DEBUG: JSON.stringify(false),
    }),
  ],
});
