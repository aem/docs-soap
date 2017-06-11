const resolve = require('path').resolve;

module.exports = {
  entry: './index.js',
  devtool: 'eval',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'docs-soap.js',
    library: 'docsSoap'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: 'es2015'
          }
        }
      }
    ]
  }
};
