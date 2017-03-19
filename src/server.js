/**
 * Server entry point.
 */

/* eslint no-console: 0 */

import path from 'path';
import hpp from 'hpp';
import logger from 'morgan';
import { createServer } from 'http';
import chalk from 'chalk';
import helmet from 'helmet';
import Express from 'express';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import compression from 'compression';
import PrettyError from 'pretty-error';


import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './redux/store';
import createRoutes from './routes';
import Html from './components/Html';

// Configuration
// --------------------------------------------------
const PUBLIC_PATH = path.join(__dirname, '..', 'dist');
// const HOST = process.env.HOSTNAME || 'localhost';
const PORT = process.env.PORT || 8081;
const ENV = process.env.NODE_ENV;
const ONE_YEAR = 60 * 1000 * 60 * 24 * 365;

// Init express app
// --------------------------------------------------
const app = new Express();
const server = createServer(app);

// Register Node.js middleware
// -----------------------------------------------------------------------------
if (__DEVELOPMENT__) {
  app.use(Express.static(PUBLIC_PATH));
} else {
  app.use(Express.static(PUBLIC_PATH, { maxAge: ONE_YEAR }));
}
// @TODO Add favicon
//app.use(favicon(path.join(__dirname, '..', 'public', 'images', 'favicon.ico')));

// Secure the server against common attacks
app.use(helmet());
app.use(hpp());

// Node.js compression middleware
app.use(compression());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setup the logger
if (__DEVELOPMENT__) {
  app.use(logger('dev', { skip: req => req.url.includes('.hot-update.') }));
} else {
  app.use(logger('combined'));
}

app.use((req, res) => {
  const initialState = {};
  const memoryHistory = createMemoryHistory(req.originalUrl);
  const location = req.url;
  const store = configureStore(initialState); // Create a new Redux store instance
  const history = syncHistoryWithStore(memoryHistory, store);
  const routes = createRoutes(store);
  const pretty = new PrettyError();

  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  function hydrateOnClient() {
    /* eslint-disable */
    res.status(200).send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store} />));
    /* eslint-enable */
  }

  // If __DISABLE_SSR__ = true, disable server side rendering
  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match({ history, routes, location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      // we matched a ReactRouter redirect, so redirect from the server
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      // something went badly wrong, so 500 with a message
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500).send(error.message);
      hydrateOnClient();
    } else if (renderProps) {
      const component = (
        <Provider store={store} key="provider">
          <RouterContext {...renderProps} />
        </Provider>
      );

      res.status(200);

      res.send(`<!doctype html>\n ${ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />)}`);
    } else {
      // no route match, so 404. In a real app you might render a custom
      // 404 view here
      res.status(404).send('Not found');
    }
  });
});

if (PORT) {
  server.listen(PORT, error => {
    if (error) {
      console.error(`==> 😭 ${error}`);
    }

    console.info(chalk.green.bold('                         ---'));
    console.info(chalk.green.bold('                        (o o)'));
    console.info(chalk.green.bold('---------------------oO--(_)--Ooo-----------------'));
    console.info(chalk.yellow(`           🚧   Environment: ${ENV.toUpperCase()}`));
    console.info(chalk.cyan(`               Server listening on port ${PORT}`));
    console.info(chalk.green.bold('--------------------------------------------------'));
  });
} else {
  console.error(chalk.red('==> 😭 No PORT environment variable has been specified'));
}
