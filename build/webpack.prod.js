// 生产环境主要实现的是压缩代码、提取css文件、合理的sourceMap、分割代码
const path = require('path')
const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
module.exports = WebpackMerge(webpackConfig, {
    mode: 'production',
    devtool: 'cheap-module',
    plugins: [
        // new BundleAnalyzerPlugin(),
        new ParallelUglifyPlugin({
            // cacheDir: path.resolve(__dirname, '../dist/cache'),
            sourceMap: false,
            uglifyJS: {
                output: {
                    comments: false,
                    beautify: false
                },
                warnings: false,
                compress: {
                    drop_console: true,
                    collapse_vars: false,
                    reduce_vars: true,
                }
            }
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new CompressionPlugin({
            test: /\.js$|\.html$|.\css/,
            threshold: 10240, //对超过10k的数据压缩
            deleteOriginalAssets: false //删除源文件
        })
        // new CopyWebapckPlugin([{
        //     from: path.resolve(__dirname, '../public'),
        //     to: path.resolve(__dirname, '../dist')
        // }]),
        
    // performance: {
    //     hints:'warning',
    //     //入口起点的最大体积 整数类型（以字节为单位）
    //     maxEntrypointSize: 50000000,
    //     //生成文件的最大体积 整数类型（以字节为单位 300k）
    //     maxAssetSize: 30000000,
    //     //只给出 js 文件的性能提示
    //     assetFilter: function(assetFilename) {
    //         return assetFilename.endsWith('.js');
    //     }
    // }
    ]
})