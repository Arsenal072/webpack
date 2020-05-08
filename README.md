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

拆分css mini-css-extract-plugin会将所有的css样式合并为一个css文件
webpack 4.0以前，我们通过extract-text-webpack-plugin插件，把css样式从js文件中提取到单独的css文件中。webpack4.0以后，官方推荐使用mini-css-extract-plugin插件来打包css文件

#### plugins

##### html-webpack-plugin   

##### clean-webpack-plugin 

##### extract-text-webpack-plugin 

如果你想拆分为一一对应的多个css文件,我们需要使用到extract-text-webpack-plugin

```js
Error: Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead
```

extract-text-webpack-plugin还不能支持webpack4.0.0以上的版本

##### webpack-bundle-analyzer  

webpack打包性能可视化插件  