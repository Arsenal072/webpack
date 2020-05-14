// 生产环境主要实现的是压缩代码、提取css文件、合理的sourceMap、分割代码
const path = require('path')
const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
module.exports = WebpackMerge(webpackConfig, {
    mode: 'production',
    devtool: 'cheap-module',
    plugins: [
        new ParallelUglifyPlugin({
            cacheDir: path.resolve(__dirname, '../dist/cache'),
            sourceMap: false,
            uglifyJS: {
                output: {
                    comments: false,
                    beautify: false
                },
                compress: {
                    drop_console: true,
                    collapse_vars: false,
                    reduce_vars: true,
                }
            }
        }),
        new OptimizeCssAssetsPlugin(),
        // new CopyWebapckPlugin([{
        //     from: path.resolve(__dirname, '../public'),
        //     to: path.resolve(__dirname, '../dist')
        // }]),
    ],
    performance: {
        hints: false
    }
})