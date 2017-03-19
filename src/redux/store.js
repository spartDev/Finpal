/**
 * Redux store configuration.
 */

 /* eslint global-require: 0 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import chalk from 'chalk';

import createReducer from '../reducers';

export default initialState => {
  let enhancers;
  let middlewares;

  if (__DEVELOPMENT__) {
    const createLogger = require('redux-logger');
    // Redux logger config
    const logger = createLogger({
      collapsed: true,
      level: 'info',
      logger: console,
    });

    // Middleware you want to use in development:
    if (__CLIENT__) {
      middlewares = [thunk, logger];
    } else {
      middlewares = [thunk];
    }
    enhancers = [
      applyMiddleware(...middlewares),
      __CLIENT__ && typeof window.devToolsExtension !== 'undefined' ?
        window.devToolsExtension() : f => f,
    ];
  } else {
    // Middleware you want to use in production:
    middlewares = [thunk];
    enhancers = [
      applyMiddleware(...middlewares),
    ];
  }

  const store = createStore(createReducer, initialState, compose(...enhancers));

  if (__DEVELOPMENT__ && module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      try {
        const reducers = require('../reducers');

        store.replaceReducer(reducers);
      } catch (error) {
        console.error(chalk.red(`==> 😭  Reducer hot reloading error ${error}`));
      }
    });
  }

  return store;
};
