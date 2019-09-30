/* eslint-disable */
const EnvironmentPlugin = require('webpack').EnvironmentPlugin
const path = require('path');
module.exports = {
  configureWebpack: {
    externals : ['node_modules/dugite']
  },
  pluginOptions: {
    lintStyleOnBuild: false,
    stylelint: {},
    electronBuilder: {
      chainWebpackRendererProcess: config => {
        config.plugin('env').use(EnvironmentPlugin, [
          {
            LOCAL_GIT_DIRECTORY: 'node_modules/dugite/git'
          }
        ])
        return config
      },
      extraResources: ['node_modules/dugite']
    }
  },
  chainWebpack: config => {
    config.module
      .rule("scss")
      .oneOf("vue-modules")
      .use("sass-loader")
      .tap(args => {
        args.includePaths = ["./node_modules"]
        return args
      })
  },
  css: {
    loaderOptions: {
      sass: {
        includePaths: [path.resolve(__dirname, "node_modules")],
      },
    },
  },
}
