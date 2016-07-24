
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var DEBUG = process.env.NODE_ENV !== 'production'

export default {
  output: {
    path: path.join(__dirname, '/dist/'),
    publicPath: '/',
    ...(DEBUG ? {
        pathinfo: true,
        filename: '[name].js',
      } : {
        filename: '[name]-[hash].min.js',
      }
    )
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    ...(DEBUG ? [
        new webpack.SourceMapDevToolPlugin({
          filename: '[file].map',
          moduleFilenameTemplate: '[absolute-resource-path]',
          fallbackModuleFilenameTemplate: '[absolute-resource-path]'
        })
      ] : []
    )
  ],
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
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.purs$/,
        loader: 'purs-loader',
        exclude: /node_modules/,

        query: {
          psc: 'psa',
          src: ['bower_components/purescript-*/src/**/*.purs', 'src/**/*.purs'],
          ffi: ['bower_components/purescript-*/src/**/*.js', 'src/**/*.js'],
        }
      },
      { test: /\.css$/, exclude: /\.useable\.css$/, loader: "style!css" },
      { test: /\.useable\.css$/, loader: "style/useable!css" }
    ]
  },
  ...(DEBUG ? {
      debug: true,
      devtool: 'cheap-module-eval-source-map',
      devServer: {
        port: 3000,
        host: 'localhost',
        historyApiFallback: true,
        watchOptions: {
          aggregateTimeout: 300,
          poll: 1000
        }
      }
    } : {}
  )
};
