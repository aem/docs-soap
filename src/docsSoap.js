const parseHTML = require('./parseHTML');

const DOCS_BOLD_WEIGHT = '700';
const ITALIC_STYLE = 'italic';

const wrapNodeAnchor = (node, href) => {
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.appendChild(node.cloneNode(true));
  return anchor;
};

const wrapNodeItalic = node => {
  const italic = document.createElement('i');
  italic.appendChild(node.cloneNode(true));
  return italic;
};

const wrapNodeStrong = node => {
  const strong = document.createElement('strong');
  strong.appendChild(node.cloneNode(true));
  return strong;
};

const applyBlockStyles = dirty => {
  const node = dirty.cloneNode(true);
  let newNode = document.createTextNode(node.textContent);
  if (node.childNodes[0] && node.childNodes[0].nodeName === 'A') {
    newNode = wrapNodeAnchor(newNode.cloneNode(true), node.childNodes[0].href);
    const inner = node.childNodes[0].childNodes[0];
    if (inner && inner.style && inner.style.fontWeight === DOCS_BOLD_WEIGHT) {
      newNode = wrapNodeStrong(newNode);
    }
    if (inner && inner.style && inner.style.fontStyle === ITALIC_STYLE) {
      newNode = wrapNodeItalic(newNode);
    }
  }
  if (node.childNodes[0] && node.childNodes[0].style && node.childNodes[0].style.fontWeight === DOCS_BOLD_WEIGHT) {
    newNode = wrapNodeStrong(newNode);
  }
  if (node.childNodes[0] && node.childNodes[0].style && node.childNodes[0].style.fontStyle === ITALIC_STYLE) {
    newNode = wrapNodeItalic(newNode);
  }
  return newNode;
};

const applyInlineStyles = dirty => {
  const node = dirty.cloneNode(true);
  let newNode = document.createTextNode(node.textContent);
  if (node.nodeName === 'A') {
    newNode = wrapNodeAnchor(newNode, node.href);
    if (node.childNodes[0] && node.childNodes[0].style && node.childNodes[0].style.fontWeight === DOCS_BOLD_WEIGHT) {
      newNode = wrapNodeStrong(newNode);
    }
    if (node.childNodes[0] && node.childNodes[0].style && node.childNodes[0].style.fontStyle === ITALIC_STYLE) {
      newNode = wrapNodeItalic(newNode);
    }
  }
  if (node.style && node.style.fontWeight === DOCS_BOLD_WEIGHT) {
    newNode = wrapNodeStrong(newNode);
  }
  if (node.style && node.style.fontStyle === ITALIC_STYLE) {
    newNode = wrapNodeItalic(newNode);
  }
  return newNode;
};

const getCleanNode = (node) => {
  if (node.childNodes && node.childNodes.length <= 1) {
    let newWrapper = null;
    let newNode = document.createTextNode(node.textContent);
    if (node.nodeName === 'LI' || node.nodeName === 'UL') {
      // TODO: Handle nested bullets
      newWrapper = document.createElement('li');
      newNode = applyBlockStyles(node.childNodes[0].childNodes[0]);
    } else if (node.nodeName === 'P') {
      newWrapper = document.createElement('p');
      newNode = applyBlockStyles(node);
    } else {
      newWrapper = document.createElement('span');
      newNode = applyInlineStyles(node);
    }
    if (newWrapper) {
      newWrapper.appendChild(newNode);
      return [newWrapper];
    }
    return [node.cloneNode(true)];
  }
  if (node.childNodes) {
    const nodes = [];
    for (let i = 0; i < node.childNodes.length; i++) {
      nodes.push(...getCleanNode(node.childNodes[i]));
    }
    return nodes;
  }
  return node;
};

/**
 * parses the given "dirty" clipboard content and returns a (mostly) clean
 * HTML document with only the HTML content you want
 * @param dirty
 * @returns {HTMLElement}
 */
const getCleanDocument = (dirty) => {
  // create a new document to preserve the integrity of the original data
  const body = document.createElement('body');
  const nodes = dirty.childNodes;
  const cleanNodes = [];

  // for each top level node, clean it up recursively
  for (let i = 0; i < nodes.length; i++) {
    cleanNodes.push(...getCleanNode(nodes[i]));
  }

  // append all of the clean nodes to the new document
  for (let i = 0; i < cleanNodes.length; i++) {
    body.appendChild(cleanNodes[i].cloneNode(true));
  }

  // all clean
  return body;
};

module.exports = (clipboardContent) => {
  if (typeof clipboardContent !== 'string') {
    throw new Error(`Expected 'clipboardContent' to be a string of HTML, received ${typeof clipboardContent}`);
  }
  if (clipboardContent.length <= 0) {
    throw new Error('Expected clipboardContent to have content, received empty string');
  }
  return getCleanDocument(parseHTML(clipboardContent.replace(/(\r\n|\n|\r)/, ''))).outerHTML;
};
