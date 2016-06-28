import { elements, styles } from './constants';
import parseHTML from './parseHTML';

const wrapNodeAnchor = (node, href) => {
  const anchor = document.createElement(elements.ANCHOR);
  anchor.href = href;
  anchor.appendChild(node.cloneNode(true));
  return anchor;
};

const wrapNodeInline = (node, style) => {
  const el = document.createElement(style);
  el.appendChild(node.cloneNode(true));
  return el;
};

const applyBlockStyles = dirty => {
  const node = dirty.cloneNode(true);
  let newNode = document.createTextNode(node.textContent);
  if (node.childNodes[0] && node.childNodes[0].nodeName === 'A') {
    newNode = wrapNodeAnchor(newNode.cloneNode(true), node.childNodes[0].href);
    const inner = node.childNodes[0].childNodes[0];
    if (inner && inner.style && inner.style.fontWeight === styles.BOLD) {
      newNode = wrapNodeInline(newNode, elements.BOLD);
    }
    if (inner && inner.style && inner.style.fontStyle === styles.ITALIC) {
      newNode = wrapNodeInline(newNode, elements.ITALIC);
    }
    if (inner && inner.style && inner.style.textDecoration === styles.UNDERLINE) {
      newNode = wrapNodeInline(newNode, elements.UNDERLINE);
    }
    if (inner && inner.style && inner.style.textDecoration === styles.STRIKETHROUGH) {
      newNode = wrapNodeInline(newNode, elements.STRIKETHROUGH);
    }
    if (inner && inner.style && inner.style.verticalAlign === styles.SUPERSCRIPT) {
      newNode = wrapNodeInline(newNode, elements.SUPERSCRIPT);
    }
    if (inner && inner.style && inner.style.verticalAlign === styles.SUBSCRIPT) {
      newNode = wrapNodeInline(newNode, elements.SUBSCRIPT);
    }
  }
  if (node.childNodes[0] && node.childNodes[0].style && node.childNodes[0].style.fontWeight === styles.BOLD) {
    newNode = wrapNodeInline(newNode, elements.BOLD);
  }
  if (node.childNodes[0] && node.childNodes[0].style && node.childNodes[0].style.fontStyle === styles.ITALIC) {
    newNode = wrapNodeInline(newNode, elements.ITALIC);
  }
  if (node.childNodes[0] && node.childNodes[0].style && node.childNodes[0].style.textDecoration === styles.UNDERLINE) {
    newNode = wrapNodeInline(newNode, elements.UNDERLINE);
  }
  if (node.childNodes[0] && node.childNodes[0].style && node.childNodes[0].style.textDecoration === styles.STRIKETHROUGH) {
    newNode = wrapNodeInline(newNode, elements.STRIKETHROUGH);
  }
  if (node.childNodes[0] && node.childNodes[0].style && node.childNodes[0].style.verticalAlign === styles.SUPERSCRIPT) {
    newNode = wrapNodeInline(newNode, elements.SUPERSCRIPT);
  }
  if (node.childNodes[0] && node.childNodes[0].style && node.childNodes[0].style.verticalAlign === styles.SUBSCRIPT) {
    newNode = wrapNodeInline(newNode, elements.SUBSCRIPT);
  }
  return newNode;
};

const applyInlineStyles = dirty => {
  const node = dirty.cloneNode(true);
  let newNode = document.createTextNode(node.textContent);
  if (node.nodeName === 'A') {
    newNode = wrapNodeAnchor(newNode, node.href);
    if (node.childNodes[0] && node.childNodes[0].style && node.childNodes[0].style.fontWeight === styles.BOLD) {
      newNode = wrapNodeInline(newNode, elements.BOLD);
    }
    if (node.childNodes[0] && node.childNodes[0].style && node.childNodes[0].style.fontStyle === styles.ITALIC) {
      newNode = wrapNodeInline(newNode, elements.ITALIC);
    }
    if (node.childNodes[0] && node.childNodes[0].style && node.childNodes[0].style.textDecoration === styles.UNDERLINE) {
      newNode = wrapNodeInline(newNode, elements.UNDERLINE);
    }
    if (node.childNodes[0] && node.childNodes[0].style && node.childNodes[0].style.textDecoration === styles.STRIKETHROUGH) {
      newNode = wrapNodeInline(newNode, elements.STRIKETHROUGH);
    }
    if (node.childNodes[0] && node.childNodes[0].style && node.childNodes[0].style.verticalAlign === styles.SUPERSCRIPT) {
      newNode = wrapNodeInline(newNode, elements.SUPERSCRIPT);
    }
    if (node.childNodes[0] && node.childNodes[0].style && node.childNodes[0].style.verticalAlign === styles.SUBSCRIPT) {
      newNode = wrapNodeInline(newNode, elements.SUBSCRIPT);
    }
  }
  if (node.style && node.style.fontWeight === styles.BOLD) {
    newNode = wrapNodeInline(newNode, elements.BOLD);
  }
  if (node.style && node.style.fontStyle === styles.ITALIC) {
    newNode = wrapNodeInline(newNode, elements.ITALIC);
  }
  if (node.style && node.style.textDecoration === styles.UNDERLINE) {
    newNode = wrapNodeInline(newNode, elements.UNDERLINE);
  }
  if (node.style && node.style.textDecoration === styles.STRIKETHROUGH) {
    newNode = wrapNodeInline(newNode, elements.STRIKETHROUGH);
  }
  if (node.style && node.style.verticalAlign === styles.SUPERSCRIPT) {
    newNode = wrapNodeInline(newNode, elements.SUPERSCRIPT);
  }
  if (node.style && node.style.verticalAlign === styles.SUBSCRIPT) {
    newNode = wrapNodeInline(newNode, elements.SUBSCRIPT);
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
