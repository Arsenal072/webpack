# webpack
#### webpack基本配置

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
    contentBase:'../dist'   //开发环境输出文件目录
  },
  plugins:[
    new Webpack.HotModuleReplacementPlugin()
  ]
```