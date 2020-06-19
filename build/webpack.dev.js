// 开发环境主要实现的是热更新,不要压缩代码，完整的sourceMap
const Webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const WebpackMerge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = WebpackMerge(webpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 8000,
        hot: true,
        contentBase: '../dist',
        compress: true
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin()
    ]
})