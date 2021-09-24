#### How to use

1. 需要安装以下依赖 

   **版本最好一致！**

```json
"svg-sprite-loader": "4.1.6",
"svg-sprite-loader-mod": "^4.1.6-mod1",
"svgo-loader": "^2.2.1",
```

2. 在`Vue.config.js`如下配置（文件内已有）

```javascript
const path = require("path");

module.exports = {
  lintOnSave: false,

  /* icon组件 */
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons') // 当前目录

    config.module
        .rule('svg-sprite')
        .test(/\.svg$/)
        .include.add(dir).end() // 只包含icons目录
        .use('svg-sprite-loader').loader('svg-sprite-loader')
        .options({extract: false}).end() //不需要解析成文件
        /* 去除svg的fill，使CSS可控制颜色 */
        .use('svgo-loader').loader('svgo-loader')
        .tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]})).end()
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
    config.module.rule('svg').exclude.add(dir) // 其他svg loader排除icons目录

  },
}

```



3. 开始使用

   该组件会将`src/assets/icons/`文件夹内的文件自动导入（也可以在`Vue.config.js`中，即上面的`dir`里修改地址），使用时直接将name属性写成svg文件名

   如下即为`src/assets/icons/logo.svg`

   ![image-20210925045446838](https://i.loli.net/2021/09/25/boiZvx7EJVFKPzp.png)

   ```vue
   <icon name="logo"><icon>
   ```

   

   如果你需要全局引入，记得在`main.js`内做如下配置

   ```javascript
   import icon from './components/Icon.vue'
   Vue.component("icon", icon);
   ```

   

