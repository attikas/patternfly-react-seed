/* eslint-disable @typescript-eslint/no-var-requires */

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { stylePaths } = require('./stylePaths');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common(), {
  mode: 'production',
  devtool: 'source-map',

  optimization: {
    minimizer: [
      // JS minification is already handled by Webpack in prod mode
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ['default', { mergeLonghand: false }],
        },
      }),
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].bundle.css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        include: stylePaths,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
});
