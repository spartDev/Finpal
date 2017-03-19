/**
 * Webpack development server
 */

 /* eslint no-console: 0 */

import chalk from 'chalk';
import webpack from 'webpack';
import Express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const PORT = process.env.PORT || 3005;
const HOST = 'localhost';
const ENV = process.env.NODE_ENV;

// Load webpack config for current environement
const configuration = require(`../webpack.config.${ENV}.babel.js`);

// Init express app
// --------------------------------------------------
const devserver = new Express();
const compiler = webpack(configuration);

const serverOptions = {
  quiet: true, // don’t output anything to the console
  noInfo: true, // suppress boring information
  hot: true, // adds the HotModuleReplacementPlugin and switch the server to hot mode. Note: make sure you don’t add HotModuleReplacementPlugin twice
  inline: true, // also adds the webpack/hot/dev-server entry

  // You can use it in two modes:
  // watch mode (default): The compiler recompiles on file change.
  // lazy mode: The compiler compiles on every request to the entry point.
  lazy: false,

  // network path for static files: fetch all statics from webpack development server
  publicPath: configuration.output.publicPath,

  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
};

// http://webpack.github.io/docs/webpack-dev-server.html
devserver.use(webpackDevMiddleware(compiler, serverOptions));
devserver.use(webpackHotMiddleware(compiler));

devserver.listen(PORT, 'localhost', error => {
  if (error) {
    console.log(error.stack || error);
    throw error;
  }

  console.info(chalk.cyan(`💻 [webpack-dev-server] Running at http://${HOST}:${PORT}`));
});
