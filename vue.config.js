const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    config.module
      .rule("scss")
      .oneOf("vue-modules")
      .use("sass-loader")
  },
  css: {
    sourceMap: true,
  },
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new CopyWebpackPlugin([
        {
          from: 'src/style',
          to: 'style/',
          toType: 'dir'
        }
      ])
    ]
  },

  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {
      configFile: '.stylelintrc'
    }
  }
}
