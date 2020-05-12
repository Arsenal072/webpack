const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const vueLoaderPlugin = require('vue-loader/lib/plugin')
// const extractLess = new ExtractTextWebpackPlugin('css/[name].[hash].css')
const extractSass = new ExtractTextWebpackPlugin('css/[name].[hash].css')
const extractCss = new ExtractTextWebpackPlugin('css/[name].[hash].css')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})

module.exports = {
    entry: {
        main: ["@babel/polyfill", path.resolve(__dirname, '../src/main.js')],
        backstage: ["@babel/polyfill", path.resolve(__dirname, '../src/backstage.js')]
    },
    output: {
        filename: 'js/[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: 'js/[name].[hash:8].js'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        compilerOptions: {
                            preserveWhitespace: false
                        }
                    }
                }],
                exclude: /node_modules/,
                include: [path.resolve(__dirname, '../src')]
            }, {
                test: /\.css$/,
                use: extractCss.extract({
                    fallback: "style-loader",
                    use: ['css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')],
                        }
                    }]
                }),
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    fallback: "style-loader",
                    use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
                }),
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('autoprefixer')],
                        
                    }
                }, 'less-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'happypack/loader?id=happyBabel'
                    // loader: 'babel-loader',
                    // options: {
                    //     presets: ['@babel/preset-env']
                    // }
                },
                exclude: /node_modules/
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
                                name: 'img/[name].[hash:8].[ext]',
                                publicPath: '../'
                            }
                        }
                    }
                }],
                exclude: /node_modules/
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
                                name: 'media/[name].[hash:8].[ext]',
                            }
                        }
                    }
                }],
                exclude: /node_modules/
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
                }],
                exclude: /node_modules/
            }

        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            ' @': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components')
        },
        extensions: ['*', '.js', '.json', '.vue']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/backstage.html'),
            filename: 'backstage.html',
            chunks: ['backstage']
        }),
        extractCss,
        extractSass,
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin(),
        new vueLoaderPlugin(),
        new HappyPack({
            id: 'happyBabel',
            loaders: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    cacheDirectory: true
                }
            }],
            threadPool: happyThreadPool
        })
    ]
}
//8428ms
//打包大小1.34M
// 更新速度321ms

//happyPack
//8961ms
//打包大小1.34M
//更新速度279ms

