import path from 'path';

// Register path
export const resolvePath = {
  root: path.resolve(__dirname, '..', '..'),
  assets: path.resolve(__dirname, '..', '..', 'dist'),
  source: path.resolve(__dirname, '..', '..', 'src'),
  nodeModules: path.resolve(__dirname, '..', '..', 'node_modules'),
  client: path.join(__dirname, '..', '..', 'src', 'client.js'),
  server: path.resolve(__dirname, '..', '..', 'index.js'),
};

// Register vendors
export const vendor = [
  'react',
  'react-dom',
  'redux',
  'react-redux',
  'redux-thunk',
  'react-router',
  'react-router-redux',
  'classnames',
  'es6-promise',
  'isomorphic-fetch',
  'serialize-javascript',
];
