'use strict';

var path = require('path');
var webpack = require('webpack');
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
    extensions: [ '', '.js', '.purs']
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    pathinfo: true,
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      moduleFilenameTemplate: '[absolute-resource-path]',
      fallbackModuleFilenameTemplate: '[absolute-resource-path]'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'source-map-loader', exclude: /node_modules|bower_components/ },
      , {  
        test: /\.purs$/,
        loader: 'purs-loader',
        exclude: /node_modules/,
        
        query: {
          psc: 'psa',
          src: ['bower_components/purescript-*/src/**/*.purs', 'src/**/*.purs'],
          ffi: ['bower_components/purescript-*/src/**/*.js', 'src/**/*.js'],
        }
      }
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
