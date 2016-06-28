'use es6';

import { elements } from '../src/constants'
import documents from './fixtures/documents';
import docsSoap from '../dist/index';
import expect from 'expect';
import jsdom from 'mocha-jsdom';
import parseHTML from '../src/parseHTML';

describe('Google Docs Converter', () => {
  jsdom();

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
});
