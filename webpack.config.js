const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './entry.js',
  target: 'electron',

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build'),
    publicPath: 'http://localhost:8080/build/',
  },

  module: {
    rules: [{
      test: /\.ttf$/,
      use: [
        'url-loader',
      ],
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    }, {
      test: /\.js$/,
      include: path.join(__dirname),
      use: ['babel-loader'],
    }],
  },
};
