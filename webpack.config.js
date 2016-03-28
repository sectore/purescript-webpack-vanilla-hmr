'use strict';

var path = require('path');
var webpack = require('webpack');
var PurescriptWebpackPlugin = require('purescript-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  entry: [
    path.join(__dirname, 'src/main.js')
  ],
  resolve: {
    modulesDirectories: [
      'node_modules',
      'bower_components'
    ],
    extensions: [ '', '.js', '.purs'],
    root: path.join(__dirname, 'src'),
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    pathinfo: true,
    filename: '[name].js',
    sourceMapFilename: '[name].map',
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
      psc: 'psa',
      pscArgs: {
        sourceMaps: true
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(true)
  ],
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'source-map-loader', exclude: /node_modules|bower_components/ },
    ],
    loaders: [
      { test: /\.purs$/, loader: 'purs-loader' }
    ]
  },
  devServer: {
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};
