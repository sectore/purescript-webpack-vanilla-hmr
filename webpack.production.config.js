'use strict';

var path = require('path');
var webpack = require('webpack');
var PurescriptWebpackPlugin = require('purescript-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, 'src/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js',
    publicPath: '/'
  },
  plugins: [
    new PurescriptWebpackPlugin({
      src: [
        'bower_components/purescript-*/src/**/*.purs',
        'src/**/*.purs'
      ],
      ffi: [
        'bower_components/purescript-*/src/**/*.js'
      ],
      bundle: false,
      psc: 'psa'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    loaders: [
      { test: /\.purs$/, loader: 'purs-loader' }
    ]
  }
};
