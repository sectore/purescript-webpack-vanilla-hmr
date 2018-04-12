const path = require('path');

const {
  DefinePlugin,
  ProgressPlugin,
  NoEmitOnErrorsPlugin,
  HotModuleReplacementPlugin
} = require('webpack');

import HtmlWebpackPlugin from 'html-webpack-plugin';
import NamedModulesPlugin from 'webpack/lib/NamedModulesPlugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const paths = {
  src: path.join(__dirname, '/src/'),
  output: path.join(__dirname, '/dist/'),
  public: '/'
}

console.log("production build: ", isProd);

module.exports = {
  devtool: isProd ? 'nosources-source-map' : 'cheap-module-eval-source-map',
  mode: nodeEnv,
  output: {
    path: paths.output,
    publicPath: paths.public,
    ...(isProd ? {
      filename: '[name]-[hash].min.js',
    } : {
      pathinfo: true,
      filename: '[name].js',
      }
    )
  },
  plugins: [
    new ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv)
    }),
    new NamedModulesPlugin(),
    new HotModuleReplacementPlugin(),
    ...(isProd ? [
          new NoEmitOnErrorsPlugin(),
          new UglifyJsPlugin({
            sourceMap: false,
            beautify: false,
            comments: false,
            compress: {
              drop_console: true,
              dead_code: true,
              warnings: false
            }
          })
        ] : []
      )
  ],
  entry: [
    path.join(__dirname, 'src/main.js')
  ],
  resolve: {
    extensions: [ '.js', '.purs']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.purs$/,
        loader: 'purs-loader',
        exclude: /node_modules/,

        query: {
          psc: 'psa',
          src: [
            path.join('src', '**', '*.purs'),
            path.join('bower_components', 'purescript-*', 'src', '**', '*.purs')
          ],
          bundle: isProd,
          watch: !isProd
        }
      }
    ]
  },
  devServer: {
    hot: !isProd,
    contentBase: paths.src,
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    stats: 'minimal',
  }
};
