// const path = require('path')

// const Webpack = require('webpack')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const {
//     CleanWebpackPlugin
// } = require('clean-webpack-plugin')
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const vueLoaderPlugin = require('vue-loader/lib/plugin')
// // const extractLess = new ExtractTextWebpackPlugin('css/[name].[hash].css')
// const extractSass = new ExtractTextWebpackPlugin('[name].[hash].scss')
// const extractCss = new ExtractTextWebpackPlugin('[name].[hash].css')

// module.exports = {
//     mode: 'development',
//     entry: {
//         main: ["@babel/polyfill", path.resolve(__dirname, '../src/main.js')],
//         // backstage: ["@babel/polyfill", path.resolve(__dirname, '../src/backstage.js')]
//     },
//     output: {
//         filename: 'js/[name].[hash].js',
//         // filename: 'bundle.js',
//         path: path.resolve(__dirname, '../dist'),
//     },
//     module: {
//         rules: [{

//                 test: /\.vue$/,
//                 use: ['vue-loader']
//             }, {
//                 test: /\.css$/,
//                 use: extractCss.extract({
//                     fallback: "style-loader",
//                     use: 'css-loader'
//                 })
//                 // use: ["style-loader", 'css-loader']
//             },
//             {
//                 test: /\.scss$/,
//                 use: extractSass.extract({
//                     fallback: "style-loader",
//                     use: ['style-loader', 'css-loader', 'sass-loader']
//                 })
//             },
//             {
//                 test: /\.less$/,
//                 use: ['style-loader', 'css-loader', 'less-loader']
//                 // use: extractLess.extract(['style-loader', 'css-loader', {
//                 //     loader: 'postcss-loader',
//                 //     options: {
//                 //         plugins: [require('autoprefixer')]
//                 //     }
//                 // },'less-loader'])
//             },
//             {
//                 test: /\.js$/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: ['@babel/preset-env']
//                     }
//                 },
//                 exclude: /node_modules/
//             },
//             {
//                 test: /\.(jpe?g|png|gif)$/i, //图片文件
//                 use: [{
//                     loader: 'url-loader',
//                     options: {
//                         limit: 10240,
//                         fallback: {
//                             loader: 'file-loader',
//                             options: {
//                                 name: 'img/[name].[hash:8].[ext]'
//                             }
//                         }
//                     }
//                 }]
//             },
//             {
//                 test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
//                 use: [{
//                     loader: 'url-loader',
//                     options: {
//                         limit: 10240,
//                         fallback: {
//                             loader: 'file-loader',
//                             options: {
//                                 name: 'media/[name].[hash:8].[ext]'
//                             }
//                         }
//                     }
//                 }]
//             },
//             {
//                 test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
//                 use: [{
//                     loader: 'url-loader',
//                     options: {
//                         limit: 10240,
//                         fallback: {
//                             loader: 'file-loader',
//                             options: {
//                                 name: 'fonts/[name].[hash:8].[ext]'
//                             }
//                         }
//                     }
//                 }]
//             }

//         ]
//     },
//     resolve:{
//         alias: {
//             'vue$': 'vue/dist/vue.runtime.esm.js',
//             ' @': path.resolve(__dirname, '../src')
//         },
//         extensions: ['*', '.js', '.json', '.vue']
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, '../public/index.html'),
//             filename: 'main.html',
//             chunks: ['main'],
//             title: '哈哈哈哈'
//         }),
//         // new HtmlWebpackPlugin({
//         //     template: path.resolve(__dirname, '../public/backstage.html'),
//         //     filename: 'backstage.html',
//         //     chunks: ['backstage']
//         // }),
//         extractCss,
//         extractSass,
//         new CleanWebpackPlugin(),
//         new BundleAnalyzerPlugin(),
//         new vueLoaderPlugin(),
//         new Webpack.HotModuleReplacementPlugin()
//     ],
//     devServer: {
//         port: 4000,
//         hot: true,
//         compress: true,
//         contentBase: path.resolve(__dirname, '../public/')
//         // publicPath: path.resolve(__dirname, '../public/')
//     }
// }


// webpack.config.js
const path = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const extractSass = new ExtractTextWebpackPlugin('[name].[hash].scss')
const extractCss = new ExtractTextWebpackPlugin('[name].[hash].css')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const Webpack = require('webpack')
module.exports = {
    mode: 'development', // 开发模式
    entry: {
        main: ["@babel/polyfill", path.resolve(__dirname, '../src/main.js')],
        backstage: ["@babel/polyfill", path.resolve(__dirname, '../src/backstage.js')]
    },
    output: {
        filename: 'js/[name].[hash:8].js', // 打包后的文件名称
        path: path.resolve(__dirname, '../dist') // 打包后的目录
    },
    module: {
        rules: [{
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env']
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: extractCss.extract({
                    fallback: "style-loader",
                    use: 'css-loader'
                })
                // use: ["style-loader", 'css-loader']
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    fallback: "style-loader",
                    use: ['style-loader', 'css-loader', 'sass-loader']
                })
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
                // use: extractLess.extract(['style-loader', 'css-loader', {
                //     loader: 'postcss-loader',
                //     options: {
                //         plugins: [require('autoprefixer')]
                //     }
                // },'less-loader'])
            },
            {
                test: /\.(jpe?g|png|gif)$/i, //图片文件
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'media/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }]
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            ' @': path.resolve(__dirname, '../src')
        },
        extensions: ['*', '.js', '.json', '.vue']
    },
    devServer: {
        port: 3000,
        hot: true,
        contentBase: '../dist'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/backstage.html'),
            filename: 'backstage.html'
        }),
        extractSass,
        extractCss,
        new vueLoaderPlugin(),
        new Webpack.HotModuleReplacementPlugin()
    ]
}