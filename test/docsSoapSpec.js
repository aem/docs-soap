'use es6';

import documents from './fixtures/documents';
import { docsSoap } from '../src/index';
import expect from 'expect';
import jsdom from 'mocha-jsdom';
import parseHTML from '../src/parseHTML';

describe('Google Docs Converter', () => {
  jsdom();

  it('converts inline styles from google docs properly', () => {
    const rawContents = parseHTML(documents.inlineStyles);
    expect(rawContents.querySelectorAll('strong').length).toBe(0);
    expect(rawContents.querySelectorAll('i').length).toBe(0);
    const doc = parseHTML(docsSoap(documents.inlineStyles));
    expect(doc.querySelectorAll('strong').length).toBe(1);
    expect(doc.querySelectorAll('i').length).toBe(1);
  });

  it('converts links from google docs properly', () => {
    const rawContents = parseHTML(documents.links);
    expect(rawContents.querySelectorAll('strong').length).toBe(0);
    expect(rawContents.querySelectorAll('i').length).toBe(0);
    expect(rawContents.querySelectorAll('a').length).toBe(4);
    const doc = parseHTML(docsSoap(documents.links));
    expect(doc.querySelectorAll('strong').length).toBe(2);
    expect(doc.querySelectorAll('i').length).toBe(2);
    expect(doc.querySelectorAll('a').length).toBe(4);
  });
});
