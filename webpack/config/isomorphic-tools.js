/**
 * Isomorphic-tools configuration.
 */

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools#configuration
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools#style-loader-css-stylesheets-with-css-modules-feature

import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';

export default {
  // debug: true,
  assets: {
    images: {
      extensions: ['png', 'jpg', 'jpeg', 'gif', 'ico'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },
    fonts: {
      extensions: ['woff', 'woff2'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },
    svg: {
      extension: 'svg',
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },
    scss: {
      extensions: ['scss'],
      filter: (module, regex, options, log) => {
        if (options.development) {
          // In development mode there's Webpack "style-loader",
          // which outputs `module`s with `module.name == asset_path`,
          // but those `module`s do not contain CSS text.
          //
          // The `module`s containing CSS text are
          // the ones loaded with Webpack "css-loader".
          // (which have kinda weird `module.name`)
          //
          // Therefore using a non-default `filter` function here.
          //
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        }

        // In production mode there will be no CSS text at all
        // because all styles will be extracted by Webpack Extract Text Plugin
        // into a .css file (as per Webpack configuration).
        //
        // Therefore in production mode `filter` function always returns non-`true`.
        return regex.test(module.name);
      },

      // How to correctly transform kinda weird `module.name`
      // of the `module` created by Webpack "css-loader"
      // into the correct asset path:
      path: (module, options, log) => {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
        }
        return module.name;
      },

      // How to extract these Webpack `module`s' javascript `source` code.
      // Basically takes `module.source` and modifies its `module.exports` a little.
      parser: (module, options, log) => {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.cssModulesLoaderParser(module, options, log);
        }
        return module.source;
      },
    },
  },
};
