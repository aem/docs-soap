// @flow

const docsSoap = require('./lib/docsSoap');
const parseHTML = require('./lib/parseHTML');

module.exports = {
  default: docsSoap,
  docsSoap: docsSoap, //eslint-disable-line
  parseHTML: parseHTML //eslint-disable-line
};
