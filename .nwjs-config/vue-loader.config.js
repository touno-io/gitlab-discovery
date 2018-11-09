'use strict'
const config = require('./config')

module.exports = {
  cacheBusting: config.dev.cacheBusting,
  transformAssetUrls: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  loaders: {
    ts: [{
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/]
      }
    }],
    scss: [{
      loaders: [
        'vue-style-loader',
        'sass-loader'
      ]
    }]
  }
}