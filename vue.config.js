/* eslint-disable */ 
const path = require("path");

module.exports = {

  /* icon组件 */
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons') // 当前目录

    config.module
        .rule('svg-sprite')
        .test(/\.svg$/)
        // 只包含icons目录
        .include.add(dir).end() 
        .use('svg-sprite-loader').loader('svg-sprite-loader')
        //不需要解析成文件
        .options({extract: false}).end() 
        /* 去除svg的fill，使CSS可控制颜色 */
        .use('svgo-loader').loader('svgo-loader')
        .tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]})).end()
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
    // 其他svg loader排除icons目录
    config.module.rule('svg').exclude.add(dir) 

  },
  /* icon组件END */
}
