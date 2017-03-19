# Finpal

**This Repo contains all sources used to build Finpal WebApp.**

This web app was made with the help of:

[React](https://facebook.github.io/react/),
[React Router](https://github.com/reactjs/react-router),
[Webpack 2](http://webpack.github.io/docs/),
[Redux](http://redux.js.org/)

## Prerequisite

- You should install first [Node JS](https://nodejs.org/en/) or [NVM](https://github.com/creationix/nvm)
*Note: requires a node version >= 6 and an npm version >= 3.*

- Then make a `npm install`

## Getting started

After that, you should be able to start the application with:

```bash
npm run start:dev
```

## Docker container
You can test the webapp production build directly in a docker container.

```bash
docker-compose build
docker-compose up
```

Access http://localhost:8081 to see the webapp.

### Using Redux DevTools

[Redux Devtools](https://github.com/gaearon/redux-devtools) are enabled by default in development mode, but you need to install [Redux DevTools chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

DevTools are not enabled during production.


## Directory Structure

* `coverage/` - files produced by [istanbul](http://gotwarlost.github.io/istanbul/) to see test coverage of the app.
* `public/` - global assets like image, fonts...
* `src/` the source code and tests of the application, take a look at the modules in this folder, you should structure your application following those conventions.
* `.babelrc` - babelrc configuration.
* `.editorconfig` - editorconfig configuration to maintain consitent coding styles between IDEs and Editors. [EditorConfig](http://editorconfig.org/)
* `.eslintignore` - [ESLint](http://eslint.org/) ignore configuration.
* `.eslintrc` - [ESLint](http://eslint.org/) configuration. Pluggable linting utility for JavaScript.
* `.gitignore` - Files to be ignored by [Git](https://git-scm.com/)
* `docker-compose.yml` Configure application’s service for docker container
* `Dockerfile` Build docker images automatically
* `index.js` - [nodemon](https://nodemon.io/) configuration that will monitor for any changes in the source and automatically restart node server (only for development)
* `nodemon.json` - main entry point to launch node server.
* `package.json` - dependencies & devdependencies.
* `webpack-assets.json` - Json file outputs with the paths of webpack generated assets


## Coding Style

### ESLINT

To run [ESLint](http://eslint.org/) you could run

- `npm run lint:js`
- Use atom with this plugin : https://github.com/AtomLinter/linter-eslint. In settings make sure "Use global ESLint installation is **unchecked** to be sure that you are using project eslint configuration. Plus, don't hesitate to check fix errors on save !
- You can override airbnb rules, add plugins or settings by editting `.eslintrc` file.
- Discuss with team to improve/remove rules

### Editing the SCSS files

This project uses [local styles](https://medium.com/seek-ui-engineering/the-end-of-global-css-90d2a4a06284) using [css-loader](https://github.com/webpack/css-loader). The way it works is that you import your stylesheet at the top of the class with your React Component, and then you use the classnames returned from that import. Like so:

```javascript
import styles from './styles.scss';
```

Then you set the `className` of your element to match one of the CSS classes in your SCSS file, and you're good to go!

```html
<div className={styles.mySection}> ... </div>
```

Don't prefix your css rules (-webkit, -moz, ...). It will be done by ``autoprefixer``.

Our SCSS modules are following the [BEM Methodology](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) for the naming.The patterns are :
```css
.block {}
.block__element {}
.block--modifier {}
```
### Images

Now it's possible to render the image both on client and server. Please refer to this issue [#39](https://github.com/erikras/react-redux-universal-hot-example/issues/39) for more detail discussion, the usage would be like below (super easy):

```javascript
import logoImage from './logo.png';
```


## Testing

### Unit Tests

The project uses [Jest](https://facebook.github.io/jest/) to run unit tests.

To run the tests in the project, just simply run:
```bash
npm test
```

To run the tests in watch mode, just simply run:
```bash
npm run test:watch
```


## Dependencies
Each dependency should be installed with `npm install -S` command.
Each dev dependency should be installed with `npm install -D` command.

`npm install` command uses [npm-shrinkwrap](https://docs.npmjs.com/cli/shrinkwrap). When you add a new dependency or update the version of an existing dependency, keep in mind that you have to run `npm shrinkwrap --dev`.


## Deploy webApp

**TODO**

---
Thanks
