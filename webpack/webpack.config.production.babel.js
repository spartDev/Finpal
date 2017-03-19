/**
 * Webpack config for creating
 * the production bundle.
 */

import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';

import { resolvePath } from './config';
import webpackCommonConfig from './webpack.config.common.babel';

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
// webpack-isomorphic-tools settings reside in a separate .js file
// (because they will be used in the web server code too).
import WebpackIsomorphicToolsConfig from './config/isomorphic-tools';

export default {
  ...webpackCommonConfig,

  // Tells webpack where to dump the files it has processed.
  // Use hashes in production for long term caching
  output: {
    ...webpackCommonConfig.output,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[id].chunk-[chunkhash].js',
    publicPath: '/',
  },

  /*
   * Module loaders
   */
  module: {

    rules: [
      ...webpackCommonConfig.module.rules,
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
              modules: true,
              localIdentName: '[hash:base64:5]',
              minimize: true,
              discardComments: { removeAll: true },
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: true,
            },
          }],
        }),
      },
    ],
  },

  /*
   * Plugins
   */
  plugins: [
    // Clean dist folder before each build
    new CleanWebpackPlugin(['dist/'], {
      root: resolvePath.root,
      verbose: true,
    }),

    // Extract css files
    new ExtractTextPlugin({ filename: '[name]-[chunkhash].css', disable: false, allChunks: true }),

    // Set webpack-isomorphic-tools to production
    new WebpackIsomorphicToolsPlugin(WebpackIsomorphicToolsConfig),

    new webpack.optimize.UglifyJsPlugin({
      mangle: { screw_ie8: true },
      sourceMap: true,
      beautify: false,
      compress: {
        screw_ie8: true,  // React doesn't support IE8
        warnings: false,
        unused: true,
        dead_code: true,
      },
      output: {
        screw_ie8: true,
        comments: false,
      },
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
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
  devtool: 'source-map',
  cache: false,

  performance: {
    hints: 'warning',
  },
};
