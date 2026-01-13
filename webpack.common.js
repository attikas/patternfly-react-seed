/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const BG_IMAGES_DIRNAME = 'bgimages';
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = () => ({
  // Limit Webpack to source files only
  context: path.resolve(__dirname, 'src'),

  entry: './index.tsx',

  module: {
    rules: [
      // ─────────────────────────────────────────────
      // TypeScript / JavaScript
      // ─────────────────────────────────────────────
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules|dist/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
          },
        },
      },

      // ─────────────────────────────────────────────
      // Fonts & icons (PatternFly)
      // ─────────────────────────────────────────────
      {
        test: /\.(svg|ttf|eot|woff|woff2)$/,
        type: 'asset/resource',
        include: [
          path.resolve(__dirname, 'node_modules/patternfly/dist/fonts'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/styles/assets/fonts'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/styles/assets/pficon'),
          path.resolve(__dirname, 'node_modules/@patternfly/patternfly/assets/fonts'),
          path.resolve(__dirname, 'node_modules/@patternfly/patternfly/assets/pficon'),
        ],
      },

      // ─────────────────────────────────────────────
      // Inline SVG (background-filter)
      // ─────────────────────────────────────────────
      {
        test: /\.svg$/,
        include: (input) => input.includes('background-filter.svg'),
        type: 'asset/inline',
      },

      // ─────────────────────────────────────────────
      // Background SVGs
      // ─────────────────────────────────────────────
      {
        test: /\.svg$/,
        include: (input) => input.includes(BG_IMAGES_DIRNAME),
        type: 'asset/inline',
      },

      // ─────────────────────────────────────────────
      // Raw SVGs (default)
      // ─────────────────────────────────────────────
      {
        test: /\.svg$/,
        include: (input) =>
          !input.includes(BG_IMAGES_DIRNAME) &&
          !input.includes('fonts') &&
          !input.includes('pficon') &&
          !input.includes('background-filter'),
        use: 'raw-loader',
      },

      // ─────────────────────────────────────────────
      // Images
      // ─────────────────────────────────────────────
      {
        test: /\.(jpg|jpeg|png|gif)$/i,
        type: 'asset/inline',
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/patternfly'),
          path.resolve(__dirname, 'node_modules/@patternfly/patternfly/assets/images'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-styles/css/assets/images'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/styles/assets/images'),
          path.resolve(
            __dirname,
            'node_modules/@patternfly/react-core/node_modules/@patternfly/react-styles/css/assets/images',
          ),
          path.resolve(
            __dirname,
            'node_modules/@patternfly/react-table/node_modules/@patternfly/react-styles/css/assets/images',
          ),
          path.resolve(
            __dirname,
            'node_modules/@patternfly/react-inline-edit-extension/node_modules/@patternfly/react-styles/css/assets/images',
          ),
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Output
  // ─────────────────────────────────────────────
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ASSET_PATH,
    clean: true,
  },

  // ─────────────────────────────────────────────
  // Plugins
  // ─────────────────────────────────────────────
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),

    new Dotenv({
      systemvars: true,
      silent: true,
    }),

    new CopyPlugin({
      patterns: [{ from: 'favicon.png', to: 'images' }],
    }),
  ],

  // ─────────────────────────────────────────────
  // Module resolution
  // ─────────────────────────────────────────────
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, 'tsconfig.json'),
      }),
    ],
    symlinks: false,
    cacheWithContext: false,
  },
});
