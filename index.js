/**
 * Run our whole server-side
 * app through babel, so we
 * can use ES2015 everywhere
 */
require('babel-register'); // eslint-disable-line global-require

const isomorphicWebpackConfig = require('./webpack/config/isomorphic-tools');
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const path = require('path');

/**
 * Define isomorphic constants.
 */
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING

global.webpackIsomorphicTools = new WebpackIsomorphicTools(isomorphicWebpackConfig)
  .server(path.resolve(__dirname), () => {
    require('./src/server.js'); // eslint-disable-line global-require
  });
