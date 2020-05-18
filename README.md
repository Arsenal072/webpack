# webpack
#### webpack基本配置

#####  生产依赖与开发依赖(-D、-S)

开发依赖：devDependencies，开发环境依赖，它里面的包只用于开发环境，不用于生产环境，这些包通常是单元测试或者打包工具等，例如gulp, grunt, webpack, moca, coffee等

#####  生产依赖

生产依赖：dependencies，应用依赖，或者叫做业务依赖，它用于指定应用依赖的外部包，这些依赖是应用发布后正常执行时所需要的，但不包含测试时或者本地打包时所使用的包。

##### mode

production||development

##### entry
##### output

```js
output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/build/",
    filename: "index.[chunkhash:8].js"
}
path:
publicPath:
```

`publicPath`设置成相对路径后，相对路径是相对于build之后的index.html的，例如，如果设置`publicPath: './dist/'`，则打包后js的引用路径为`./dist/main.js`，但是这里有一个问题，相对路径在访问本地时可以，但是如果将静态资源托管到CDN上则访问路径显然不能使用相对路径，但是如果将`publicPath`设置成`/`，则打包后访问路径为`localhost:8080/dist/main.js`，本地无法访问

url根路径

### devServer.publicPath & devServer.contentBase

- devServer.contentBase 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。
- devServer.publicPath 将用于确定应该从哪里提供 bundle，并且此选项优先。

#### loader

##### style-loader
##### sass-loader   

```js
cnpm i -D node-sass sass-loader style-loader
```

##### less-loader   

```js
cnpm i -D less less-loader
```

##### postcss-loader 

```js
cnpm i -D postcss-loader autoprefixer
```

##### file-loader

将文件在进行一些处理后（主要是处理文件名和路径、解析文件url），并将文件移动到输出的目录中

##### url-loader

一般与`file-loader`搭配使用，功能与 file-loader 类似，如果文件小于限制的大小，则会返回 base64 编码，否则使用 file-loader 将文件移动到输出的目录中

##### babel-loader

```js
cnpm i -D babel-loader @babel/preset-env @babel/core
```

`babel-loader`只会将 ES6/7/8语法转换为ES5语法，但对新api并不会转换 例如(promise、Generator、Set、Maps、Proxy等)。此时我们需要借助babel-polyfill来帮助我们转换。

##### babel-polyfill

```js
module.exports = {
    entry:["@babel/polyfill",path.resolve(__dirname,'../src/index.js')],// 入口文件
}
```

##### vue-loader

```js
npm i -D vue-loader vue-template-compiler vue-style-loader
npm i -S vue
```

用于解析`.vue`文件

`vue-template-compiler` 用于编译模板

##### webpack-dev-server

#### plugins

loader用于转换非JavaScript类型的文件，而插件可以用于执行范围更广的任务，包括打包、优化、压缩、搭建服务器等等，功能十分强大。要是用一个插件，一般是先使用npm包管理器进行安装，然后在配置文件中引入，最后将其实例化后传递给plugins数组属性。

##### html-webpack-plugin   

```js
new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../public/index.html'),
    filename: 'index.html'
})//当多入口时，则其中
```

##### clean-webpack-plugin 

##### extract-text-webpack-plugin 

如果你想拆分为一一对应的多个css文件,我们需要使用到extract-text-webpack-plugin

```js
Error: Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead
```

extract-text-webpack-plugin还不能支持webpack4.0.0以上的版本

拆分css mini-css-extract-plugin会将所有的css样式合并为一个css文件
webpack 4.0以前，我们通过extract-text-webpack-plugin插件，把css样式从js文件中提取到单独的css文件中。webpack4.0以后，官方推荐使用mini-css-extract-plugin插件来打包css文件

##### webpack-bundle-analyzer  

webpack打包性能可视化插件  

##### webpack-dev-server

```js
  devServer:{
    port:3000,
    hot:true,
    contentBase:'../dist'   //开发环境输出资源文件目录
  },
  plugins:[
    new Webpack.HotModuleReplacementPlugin()
  ]
```

##### `webpack.dev.js` 开发环境配置文件

开发环境主要实现的是热更新,不要压缩代码，完整的sourceMap

##### `webpack.prod.js` 生产环境配置文件

生产环境主要实现的是压缩代码、提取css文件、合理的sourceMap、分割代码

- `webpack-merge` 合并配置
- `copy-webpack-plugin` 拷贝静态资源
- `optimize-css-assets-webpack-plugin` 压缩css
- `uglifyjs-webpack-plugin` 压缩js

`webpack mode`设置`production`的时候会自动压缩js代码。原则上不需要引入`uglifyjs-webpack-plugin`进行重复工作。但是`optimize-css-assets-webpack-plugin`压缩css的同时会破坏原有的js压缩，所以这里我们引入`uglifyjs`进行压缩



##### 引入全局样式

#### 优化webpack配置

##### 优化打包速度

构建速度指的是我们每次修改代码后热更新的速度以及发布前打包文件的速度。

##### 合理的配置mode参数与devtool参数

`mode`可设置`development`` production`两个参数，如果没有设置，`webpack4` 会将 `mode` 的默认值设置为 `production` .`production`模式下会进行`tree shaking`(去除无用代码)和`uglifyjs`(代码压缩混淆)

##### 缩小文件的搜索范围(配置include exclude alias noParse extensions)

- `alias`: 当我们代码中出现 `import 'vue'`时， webpack会采用向上递归搜索的方式去`node_modules` 目录下找。为了减少搜索范围我们可以直接告诉webpack去哪个路径下查找。也就是别名(`alias`)的配置。
- `include exclude` 同样配置`include exclude`也可以减少`webpack loader`的搜索转换时间。
- `noParse ` 当我们代码中使用到`import jq from 'jquery'`时，`webpack`会去解析jq这个库是否有依赖其他的包。但是我们对类似`jquery`这类依赖库，一般会认为不会引用其他的包(特殊除外,自行判断)。增加`noParse`属性,告诉`webpack`不必解析，以此增加打包速度。
- extensions webpack会根据extensions定义的后缀查找文件(频率较高的文件类型优先写在前面) 

##### 使用HappyPack开启多进程Loader转换

在webpack构建过程中，实际上耗费时间大多数用在loader解析转换以及代码的压缩中。日常开发中我们需要使用Loader对js，css，图片，字体等文件做转换操作，并且转换的文件数据量也是非常大。由于js单线程的特性使得这些转换操作不能并发处理文件，而是需要一个个文件进行处理。HappyPack的基本原理是将这部分任务分解到多个子进程中去并行处理，子进程处理完成后把结果发送到主进程中，从而减少总的构建时间



##### 使用webpack-parallel-uglify-plugin 增强代码压缩,优化代码的压缩时间

```js
npm i -D webpack-parallel-uglify-plugin
```

