# docs-soap [![Build Status](https://travis-ci.org/aem/docs-soap.svg?branch=master)](https://travis-ci.org/aem/docs-soap) [![npm version](https://badge.fury.io/js/docs-soap.svg)](https://badge.fury.io/js/docs-soap) [![codecov](https://codecov.io/gh/aem/docs-soap/branch/master/graph/badge.svg)](https://codecov.io/gh/aem/docs-soap)

docs-soap is a small, simple library that can be used to transform clipboard contents from Google Docs into readable HTML. This library was born from the need to parse clipboard content from Google Docs into a [DraftJS](https://www.github.com/facebook/draft-js) Rich Text Editor and fits nicely into Draft's `handlePastedText` hook.

This project was developed for use in a client-side project. To use in a Node environment, your project will also require [jsdom-global](https://www.npmjs.com/package/jsdom-global). 

### New in 0.1.6

* Fixed bug where `<br>` tags would be stripped from output

### Exported API
```js
export default docsSoap(html: string): string;
export {
  docsSoap(html: string): string,
  parseHTML(html: string): HTMLElement
};
```

### Testing
Tests are written in Mocha, using `expect` for assertions. `npm run test` will run all tests in the `test/` directory, allowing you to test the entire library's functionality at once. All contributions to the repository are expected to contain accompanying tests.

In the `examples/` directory, there's a simple HTML example that, after running `gulp` in the project root, can be used to test your changes or just see the library in action. 

### Usage
```bash
npm install --save docs-soap
```
```js
import docsSoap from 'docs-soap';
const html = '<body><b><span style="font-weight:700">bold text</span><span style="font-style:italic">some italic text</span></b></body>';
const clean = docsSoap(html);
console.log(clean); /* "<body><strong>some bold text</strong><i>some italic text</i></body>" */
```
