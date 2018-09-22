const EnvironmentPlugin = require('webpack').EnvironmentPlugin
module.exports = {
  pluginOptions: {
    electronBuilder: {
      chainWebpackRendererProcess: config => {
        config.plugin('env').use(EnvironmentPlugin, [
          {
            LOCAL_GIT_DIRECTORY: 'node_modules/dugite/git',
            LOCAL_FS_DIRECTORY: 'node_modules/fs/'
          }
        ])
        return config
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/assets/nuiverse.min.css";
        @import "~@/assets/Safira/safira.css";
        @font-face {
          font-family: 'Segoe MDL2 Assets';
          src: url(~@/assets/sergeo-mdl2/SegMDL2.ttf) format('truetype'), /* Safari, Android, iOS */
        }`
      }
    }
  }
}
