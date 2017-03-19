/**
 * Webpack common configuration.
 */

import webpack from 'webpack';

import { vendor, resolvePath } from './config';

export default {

  target: 'web',

  context: resolvePath.root,

  // Tells webpack where to start looking.
  entry: {
    main: [resolvePath.client],
    vendor,
  },

  // Tells webpack where to dump the files it has processed.
  output: {
    path: resolvePath.assets,
  },

  /*
   * Module loaders
   */
  module: {
    rules: [{
      test: /.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['latest', { es2015: { modules: false } }], 'react', 'stage-2'],
        },
      }],
      exclude: [/node_modules/, /public/],
    },
    {
      test: /\.(woff|woff2|svg|jpg|png|gif|ico)$/,
      use: { loader: 'url-loader', options: { limit: 10000 } },
    }],
  },

  /*
   * Resolve
   */
  resolve: {
    extensions: ['.js', '.scss'],
    modules: [
      resolvePath.source,
      resolvePath.nodeModules,
    ],
    mainFields: ['browser', 'jsnext:main', 'main'],
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
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
      __DEVELOPMENT__: process.env.NODE_ENV === 'development',
      __CLIENT__: true,
      __SERVER__: false,
    }),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity,
    }),
  ],
};
