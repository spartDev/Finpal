/**
 * Webpack config the server production
 */

import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

import { resolvePath } from './config';
import webpackCommonConfig from './webpack.config.common.babel';

export default {
  ...webpackCommonConfig,

  target: 'node',

  node: {
    __filename: true,
    __dirname: true,
  },

  externals: [
    nodeExternals({
      importType: 'commonjs2',
      whitelist: [],
    }),
  ],

  // Tells webpack where to start looking.
  entry: resolvePath.server,

  // Tells webpack where to dump the files it has processed.
  output: {
    ...webpackCommonConfig.output,
    filename: 'server.js',
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },

  /*
   * Module loaders
   */
  module: {

    rules: [
      ...webpackCommonConfig.module.rules,
      {
        test: /\.scss$/,
        use: { loader: 'css-loader/locals' },
      },
    ],
  },

  /*
   * Plugins
   */
  plugins: [

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      __DEVELOPMENT__: false,
      __CLIENT__: false,
      __SERVER__: true,
      __DISABLE_SSR__: false,
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: {
        except: ['GeneratorFunction', 'GeneratorFunctionPrototype'],
      },
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ],

  cache: false,

  performance: {
    hints: false,
  },
};
