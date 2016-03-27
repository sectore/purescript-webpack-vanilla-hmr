'use strict';

var path = require('path');
var webpack = require('webpack');
var PurescriptWebpackPlugin = require('purescript-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var src = [
  'bower_components/purescript-*/src/**/*.purs',
  'src/**/*.purs'
];

var ffi = [
  'bower_components/purescript-*/src/**/*.js'
];

var modulesDirectories = [
  'node_modules',
  'bower_components'
];

var isProductionBuild = process.env.NODE_ENV === 'production';

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    pathinfo: true,
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new PurescriptWebpackPlugin({
      src: src,
      ffi: ffi,
      bundle: false,
      psc: 'psa',
      pscArgs: {
        sourceMaps: true
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html'
    })
  ],
  module: {
    loaders: [
      { test: /\.purs$/, loader: 'purs-loader' },
      { test: /\.js$/, loader: 'source-map-loader', exclude: /node_modules|bower_components/ }
    ]
  },
  resolve: {
    modulesDirectories: modulesDirectories,
    extensions: [ '', '.js', '.purs']
  },
};
