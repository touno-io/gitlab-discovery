const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')

const path = require('path');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { dependencies } = require('../package')
const merge = require('webpack-merge')
const config = require('./config')
const utils = require('./utils')

let webpackConfig = {
  context: path.resolve(__dirname, '../'),
  stats: 'errors-only',
  entry: {
    app: path.resolve(__dirname, './nw.bkg.js')
  },
  mode: 'development',
  output: {
    path: config.build.assetsRoot,
    filename: 'nwjs.bkg.js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.join(__dirname, '../dist/static')
    }
  },
  target: 'node-webkit',
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/nwjs.bkg.js'),
  },
  externals: [
    // Externalize all dependencies inside of the application directory.
    function (context, request, callback) {
      if (dependencies && dependencies[request]) {
        return callback(null, 'commonjs ' + request)
      } else {
        callback()
      }
    }
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        // messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        messages: ['NW.js background script compiled successfully'],
      },
      onErrors: config.dev.notifyOnErrors
      ? utils.createNotifierCallback()
      : undefined
    })
  ]
}
if (process.env.NODE_ENV !== 'development') webpackConfig.mode = 'production';
module.exports = webpackConfig