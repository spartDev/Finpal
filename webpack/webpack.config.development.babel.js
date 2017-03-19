/**
 * Webpack config for creating
 * the development bundle.
 */

import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';

import { resolvePath } from './config';
import webpackCommonConfig from './webpack.config.common.babel';

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
// webpack-isomorphic-tools settings reside in a separate .js file
// (because they will be used in the web server code too).
import WebpackIsomorphicToolsConfig from './config/isomorphic-tools';

require('react-hot-loader/patch');

const host = 'localhost';
const port = process.env.PORT || 3005;

export default {
  ...webpackCommonConfig,

  // Tells webpack where to start looking.
  entry: {
    ...webpackCommonConfig.entry,
    main: [
      `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`,
      'react-hot-loader/patch',
      ...webpackCommonConfig.entry.main,
    ],
  },

  // Tells webpack where to dump the files it has processed.
  // Don't use hashes in development for better performance
  output: {
    ...webpackCommonConfig.output,
    filename: '[name].js',
    chunkFilename: 'chunk-[id].js',
    publicPath: `http://${host}:${port}/dist/`,
  },

  /*
   * Module loaders
   */
  module: {

    rules: [
      ...webpackCommonConfig.module.rules,
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            sourceMap: true,
            modules: true,
            localIdentName: '[local]__[hash:base64:5]',
            minimize: false,
          },
        },
        {
          loader: 'postcss-loader',
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }],
      },
    ],
  },

  /*
   * Plugins
   */
  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // Avoid publishing files when compilation fails
    new webpack.NoEmitOnErrorsPlugin(),

    // Module ids are full names
    // Outputs more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // Set webpack-isomorphic-tools to development
    new WebpackIsomorphicToolsPlugin(WebpackIsomorphicToolsConfig).development(true),

    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      options: {
        postcss: [
          autoprefixer({
            browsers: [
              'last 2 version',
            ],
          }),
        ],
        context: resolvePath.root,
      },
    }),

    ...webpackCommonConfig.plugins,
  ],

  // Emit a source map for easier debugging
  devtool: 'cheap-module-eval-source-map',
  cache: true,

  performance: {
    hints: false,
  },
};
