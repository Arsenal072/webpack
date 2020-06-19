const path = require('path')
const webpack = require('webpack')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')//文件清除
module.exports = {
    mode: 'development',
    entry: {
        vendor: ['vue', 'element-ui']
    },
    output: {
        path: path.resolve(__dirname, '../dll'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '../dll/[name]_manifest.json'),
            name: '[name]_library',
            context: __dirname
        }),
        // new CleanWebpackPlugin(['dll'], { root: path.resolve(__dirname, "../") })
    ]
}