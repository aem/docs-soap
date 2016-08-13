'use es6';

import { elements } from '../src/constants';
import documents from './fixtures/documents';
import docsSoap from '../src/index';
import expect from 'expect';
import jsdom from 'mocha-jsdom';
import parseHTML from '../src/parseHTML';

describe('Google Docs Converter', () => {
  jsdom();

  it('converts plain doc', () => {
    const doc = docsSoap(documents.plain);
    expect(doc).toExist();
    const parsed = parseHTML(doc);
    expect(parsed.textContent).toBe('Hello world.');
  });

  it('converts inline styles from google docs properly', () => {
    const rawContents = parseHTML(documents.inlineStyles);
    expect(rawContents.querySelectorAll(elements.BOLD).length).toBe(0);
    expect(rawContents.querySelectorAll(elements.ITALIC).length).toBe(0);
    expect(rawContents.querySelectorAll(elements.UNDERLINE).length).toBe(0);
    expect(rawContents.querySelectorAll(elements.STRIKETHROUGH).length).toBe(0);
    expect(rawContents.querySelectorAll(elements.SUPERSCRIPT).length).toBe(0);
    expect(rawContents.querySelectorAll(elements.SUBSCRIPT).length).toBe(0);
    const doc = parseHTML(docsSoap(documents.inlineStyles));
    expect(doc.querySelectorAll(elements.BOLD).length).toBe(1);
    expect(doc.querySelectorAll(elements.ITALIC).length).toBe(1);
    expect(doc.querySelectorAll(elements.UNDERLINE).length).toBe(1);
    expect(doc.querySelectorAll(elements.STRIKETHROUGH).length).toBe(1);
    expect(doc.querySelectorAll(elements.SUPERSCRIPT).length).toBe(1);
    expect(doc.querySelectorAll(elements.SUBSCRIPT).length).toBe(1);
  });

  it('converts links from google docs properly', () => {
    const rawContents = parseHTML(documents.links);
    expect(rawContents.querySelectorAll(elements.BOLD).length).toBe(0);
    expect(rawContents.querySelectorAll(elements.ITALIC).length).toBe(0);
    expect(rawContents.querySelectorAll(elements.ANCHOR).length).toBe(4);
    const doc = parseHTML(docsSoap(documents.links));
    expect(doc.querySelectorAll(elements.BOLD).length).toBe(2);
    expect(doc.querySelectorAll(elements.ITALIC).length).toBe(2);
    expect(doc.querySelectorAll(elements.ANCHOR).length).toBe(4);
  });

  it('converts nested list from google docs properly', () => {
    const doc = parseHTML(docsSoap(documents.nestedList));
    // ol
    // - li
    // - ol
    //   - li
    //   - ol
    //     - li
    // - li
    // - ol
    //   ....
    // ul
    // - li
    // - li
    // - ul
    //   - li
    //   - ul
    //     - li
    expect(doc.childNodes[0].nodeName).toBe('OL');
    expect(doc.childNodes[0].childNodes.length).toBe(4);
    expect(doc.childNodes[0].childNodes[0].nodeName).toBe('LI');
    // jsdom bug: should actually include a line break
    expect(doc.childNodes[0].childNodes[0].textContent).toBe('Abcd1234');
    expect(doc.childNodes[0].childNodes[1].nodeName).toBe('OL');
    expect(doc.childNodes[0].childNodes[1].childNodes.length).toBe(2);
    expect(doc.childNodes[0].childNodes[1].childNodes[0].nodeName).toBe('LI');
    expect(doc.childNodes[0].childNodes[1].childNodes[1].nodeName).toBe('OL');
    expect(doc.childNodes[0].childNodes[1].childNodes[1].childNodes.length).toBe(1);
    expect(doc.childNodes[0].childNodes[1].childNodes[1].childNodes[0].nodeName).toBe('LI');
    expect(doc.childNodes[0].childNodes[2].nodeName).toBe('LI');
    expect(doc.childNodes[0].childNodes[2].childNodes.length).toBe(1);
    expect(doc.childNodes[0].childNodes[3].nodeName).toBe('OL');

    expect(doc.childNodes[1].nodeName).toBe('UL');
    expect(doc.childNodes[1].childNodes.length).toBe(3);
    expect(doc.childNodes[1].childNodes[0].nodeName).toBe('LI');
    expect(doc.childNodes[1].childNodes[1].nodeName).toBe('LI');
    expect(doc.childNodes[1].childNodes[2].nodeName).toBe('UL');
    expect(doc.childNodes[1].childNodes[2].childNodes[0].nodeName).toBe('LI');
    expect(doc.childNodes[1].childNodes[2].childNodes[1].nodeName).toBe('UL');
    expect(doc.childNodes[1].childNodes[2].childNodes[1].childNodes[0].nodeName).toBe('LI');
    expect(doc.childNodes[1].childNodes[2].childNodes[1].childNodes[0].childNodes.length).toBe(1);
  });

  it('converts deep nested styles from gdocs properly', () => {
    const doc = parseHTML(docsSoap(documents.nestedList));
    expect(doc.childNodes[0].childNodes[0].querySelectorAll(elements.BOLD).length).toBe(3);
    expect(doc.childNodes[0].childNodes[0].querySelectorAll(elements.UNDERLINE).length).toBe(3);
    expect(doc.childNodes[0].childNodes[1].childNodes[1].childNodes[0].querySelectorAll(elements.ITALIC).length).toBe(1);
    expect(doc.childNodes[0].childNodes[1].childNodes[1].childNodes[0].querySelector(elements.ITALIC).textContent).toBe('italics');
    expect(doc.childNodes[0].childNodes[1].childNodes[1].childNodes[0].querySelectorAll(elements.UNDERLINE).length).toBe(1);
    expect(doc.childNodes[0].childNodes[1].childNodes[1].childNodes[0].querySelector(elements.UNDERLINE).textContent).toBe('underline');
  });

  it('converts header types properly', () => {
    const doc = parseHTML(docsSoap(documents.headers));
    expect(doc.querySelectorAll('h1').length).toBe(1);
    expect(doc.querySelectorAll('h2').length).toBe(1);
    expect(doc.querySelectorAll('h3').length).toBe(1);
    expect(doc.querySelectorAll('h4').length).toBe(1);
  });

  it('converts brs properly', () => {
    const doc = parseHTML(docsSoap(documents.brs));
    expect(doc.querySelectorAll('br').length).toBe(2);
  });
});
