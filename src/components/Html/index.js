import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';


const getJavascriptAssets = assets => Object.keys(assets.javascript).reverse().map((jsAsset, index) => {
  const key = `key__${index}`;
  return (
    <script src={assets.javascript[jsAsset]} key={key} charSet="UTF-8" defer />
  );
});

const getStyleAssets = assets => Object.keys(assets.styles).map((style, index) => {
  const key = `key__${index}`;
  return (
    <link
      href={assets.styles[style]}
      key={key}
      media="screen, projection"
      rel="stylesheet"
      type="text/css"
      charSet="UTF-8"
    />
  );
});

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */

 /* eslint react/no-danger: 0 */

const Html = ({ assets, component, store }) => {
  const appContent = component ? ReactDOM.renderToString(component) : '';
  const head = Helmet.rewind();

  return (
    <html lang="fr">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}

        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* styles (will be present only in production with webpack extract text plugin) */}
        {getStyleAssets(assets)}

      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: appContent }} style={{ height: '100%' }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${serialize(store.getState())};` }} charSet="UTF-8" />
        {getJavascriptAssets(assets)}
      </body>
    </html>
  );
};

Html.propTypes = {
  assets: PropTypes.object.isRequired,
  component: PropTypes.node.isRequired,
  store: PropTypes.object.isRequired,
};

export default Html;
