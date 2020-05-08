# webpack
webpack学习

# mode
# entry
# output

# html-webpack-plugin
# clean-webpack-plugin
# style-loader
# sass-loader cnpm i -D node-sass sass-loader style-loader
# less-loader cnpm i -D less less-loader
# postcss-loader cnpm i -D postcss-loader autoprefixer
# 拆分css mini-css-extract-plugin会将所有的css样式合并为一个css文件
webpack 4.0以前，我们通过extract-text-webpack-plugin插件，把css样式从js文件中提取到单独的css文件中。webpack4.0以后，官方推荐使用mini-css-extract-plugin插件来打包css文件
# extract-text-webpack-plugin 如果你想拆分为一一对应的多个css文件,我们需要使用到extract-text-webpack-plugin
