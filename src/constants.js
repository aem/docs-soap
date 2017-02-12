const docsId = /id="docs\-internal\-guid/;

const styles = {
  BOLD: '700',
  ITALIC: 'italic',
  UNDERLINE: 'underline',
  STRIKETHROUGH: 'line-through',
  SUPERSCRIPT: 'super',
  SUBSCRIPT: 'sub'
};

const elements = {
  ANCHOR: 'a',
  BOLD: 'strong',
  ITALIC: 'em',
  UNDERLINE: 'u',
  STRIKETHROUGH: 'del',
  SUPERSCRIPT: 'sup',
  SUBSCRIPT: 'sub'
};

const headers = [
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6'
];

module.exports = { docsId, styles, elements, headers };
