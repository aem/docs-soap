const config = require('./webpack.config');
const resolve = require('path').resolve;
const webpack = require('webpack');

module.exports = Object.assign({}, config, {
  devtool: false,
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'docs-soap.min.js',
    library: 'docsSoap'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
});
