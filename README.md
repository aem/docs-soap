# docs-soap
docs-soap is a small, simple library that can be used to clean clipboard contents from Google Docs born from
the need to parse clipboard content from Google Docs into a [DraftJS](https://www.github.com/facebook/draft-js) Rich Text Editor in a
valid HTML structure. 

Both Google mutates clipboard contents severely. Google stores bold and italic text as follows:
```html
<b>
  <p style="font-weight:700">this is some bold text</p>
  <p style="font-style:italic">this is some italic text</p>
</b>
```
And this is just the basics. This (albeit currently basic) library will aim to ease those pains and provide users an easy way to parse
this clipboard content to valid HTML.

This project was developed for use in a client-side project. To use in a node environment, take a look at [jsdom](https://www.npmjs.com/package/jsdom)

### API
```js
export {
  convertGoogleToHTML(html: string) -> string,
  parseHTML(html: string) -> HTMLElement
}
```
