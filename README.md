# docs-soap [![Build Status](https://travis-ci.org/aem/docs-soap.svg?branch=master)](https://travis-ci.org/aem/docs-soap) [![npm version](https://badge.fury.io/js/docs-soap.svg)](https://badge.fury.io/js/docs-soap) [![codecov](https://codecov.io/gh/aem/docs-soap/branch/master/graph/badge.svg)](https://codecov.io/gh/aem/docs-soap)

[![Greenkeeper badge](https://badges.greenkeeper.io/aem/docs-soap.svg)](https://greenkeeper.io/)

docs-soap is a small (1.5kb minified/gzipped), simple library that can be used to transform clipboard contents from Google Docs into readable HTML. This library was born from the need to parse clipboard content from Google Docs into a [DraftJS](https://www.github.com/facebook/draft-js) Rich Text Editor and fits nicely into Draft's `handlePastedText` hook.

This project was developed for use in a client-side project. To use in a Node environment, your project will also require [jsdom-global](https://www.npmjs.com/package/jsdom-global).

### New in 1.1.0

* Moving to a webpack build instead of gulp/browserify, resolving webpack's warning about using minified files (#24)
* Moving to CommonJS modules based on my new revelation that the webpack/Babel ESModule implementation is technically incorrect. The side-effect of this is this library no longer supports mixed exports. As such, if you are using `docs-soap` in a CommonJS environment you'll need to switch to importing the library via `require('docs-soap').default`.
* We now suppport non-bundled builds! See the second below on using the package via a CDN. Obviously I recommend a module-bundling system, but I want to support as many people as possible.
* Got rid of the changelog. Just take a look at the release tags if you want a history :)

### Exported API
```js
module.exports = {
  default: docsSoap,
  docsSoap,
  parseHTML
};
```

### Testing
Tests are written in Mocha, using `expect` for assertions. `npm run test` will run all tests in the `test/` directory, allowing you to test the entire library's functionality at once. All contributions to the repository are expected to contain accompanying tests.

In the `examples/` directory, there's a simple HTML example that, after running `npm run build` in the project root, can be used to test your changes or just see the library in action.

### Installation
#### ESM
```bash
yarn add docs-soap
```
```js
import docsSoap from 'docs-soap';
```

#### CommonJS
```bash
yarn add docs-soap
```
```js
const docsSoap = require('docs-soap').default;
```

#### Script tag
```html
<script src="https://unpkg.com/docs-soap@1.1.0/dist/docs-soap.min.js"></script>
```
```js
var docsSoap = window.docsSoap.default;
```

### Usage
```js
const html = '<body><b><span style="font-weight:700">bold text</span><span style="font-style:italic">some italic text</span></b></body>';
const clean = docsSoap(html);
console.log(clean); /* "<body><strong>some bold text</strong><i>some italic text</i></body>" */
```
