const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const extractLess = new ExtractTextWebpackPlugin('css/[name].[hash].css')
// const extractSass = new ExtractTextWebpackPlugin('css/[name].[hash].css')
// const extractCss = new ExtractTextWebpackPlugin('css/[name].[hash].css')

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, '../src/main.js'),
        backstage: path.resolve(__dirname, '../src/backstage.js')
    },
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: ExtractTextWebpackPlugin({
                //     fallback: "style-loader",
                //     use: 'css-loader'
                // })
                use: ExtractTextWebpackPlugin.extract("style-loader","css-loader")
                // use: ["style-loader",'css-loader']
            },
            // {
            //     test: /\.scss$/,
            //     use: extractSass.extract(['style-loader', 'css-loader', 'sass-loader'])
            // },
            // {
            //     test: /\.less$/,
            //     use: extractLess.extract(['style-loader', 'css-loader', {
            //         loader: 'postcss-loader',
            //         options: {
            //             plugins: [require('autoprefixer')]
            //         }
            //     },'less-loader'])
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'main.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/backstage.html'),
            filename: 'backstage.html',
            chunks: ['backstage']
        }),
        new CleanWebpackPlugin(),
        // new MiniCssExtractPlugin({
        //     filename: "[name].[hash].css",
        //     chunkFilename: '[id].css'
        // }),
        new ExtractTextWebpackPlugin('[name].css'),
        new BundleAnalyzerPlugin()
    ]
}