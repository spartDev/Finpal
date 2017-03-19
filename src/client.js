/**
 * Client entry point.
 */

/* eslint no-console: 0 global-require: 0 */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, browserHistory } from 'react-router';

import configureStore from './redux/store';

import '../public/stylesheet/styles.scss';

const initialState = window.__INITIAL_STATE__; //eslint-disable-line
const store = configureStore(initialState);

// Create an enhanced history that syncs navigation
//  events with the store
// --------------------------------------------------
const history = syncHistoryWithStore(browserHistory, store);

// Client Render
// --------------------------------------------------
const MOUNT_NODE = document.getElementById('root');

const renderApp = () => {
  const routes = require('./routes')(store);

  let rootElement;

  if (__DEVELOPMENT__) {
    const { AppContainer } = require('react-hot-loader');
    rootElement = (
      <AppContainer>
        <Provider store={store} key="provider">
          <Router routes={routes} history={history} />
        </Provider>
      </AppContainer>
    );
  } else {
    rootElement = (
      <Provider store={store} key="provider">
        <Router routes={routes} history={history} />
      </Provider>
    );
  }

  render(rootElement, MOUNT_NODE);
};

if (__DEVELOPMENT__) {
  // enable debugger
  window.React = React;

  // Enable hot reload by react-hot-loader
  if (module.hot) {
    const reRenderApp = () => {
      try {
        renderApp();
      } catch (error) {
        const RedBox = require('redbox-react').default;

        render(<RedBox error={error} />, MOUNT_NODE);
      }
    };
    module.hot.accept('./routes', () => {
      setImmediate(() => {
        // Preventing the hot reloading error from react-router
        unmountComponentAtNode(MOUNT_NODE);
        reRenderApp();
      });
    });
  }
}

renderApp();
