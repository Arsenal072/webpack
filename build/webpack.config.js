const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const vueLoaderPlugin = require('vue-loader/lib/plugin')
// const CopyWebapckPlugin = require('copy-webpack-plugin')
// const HappyPack = require('happypack')
// const os = require('os')
// const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})

module.exports = {
    entry: {
        main: ["@babel/polyfill",path.resolve(__dirname, '../src/main.js')],
        backstage: ["@babel/polyfill", path.resolve(__dirname, '../src/backstage.js')]
    },
    output: {
        filename: 'js/[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: 'static/[name]_[chunkhash:8].js',
    },
    module: {
        rules: [{
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    // options: {
                    //     compilerOptions: {
                    //         preserveWhitespace: false
                    //     }
                    // }
                }],
                include: [path.resolve(__dirname, '../src')]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')],
                        }
                    }]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['style-loader', 'css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')],
                        }
                    }, 'sass-loader']
                })
            },
            {
                test: /\.js$/,
                // use: [{
                //     // loader: 'happypack/loader?id=happyBabel'
                //     use: ['babel-loader', 'eslint-loader'],
                //     options: {
                //         presets: ['@babel/preset-env']
                //     }
                // }],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                // use: ['babel-loader'],
                // , 'eslint-loader'
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
            }

        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            '@': path.resolve(__dirname, '../src'),
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
        new ExtractTextPlugin('css/[name]_[chunkhash:8].css'),
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin(),
        new vueLoaderPlugin(),
        // new HappyPack({
        //     id: 'happyBabel',
        //     loaders: [{
        //         loader: 'babel-loader',
        //         options: {
        //             presets: ['@babel/preset-env'],
        //             cacheDirectory: true
        //         }
        //     }],
        //     threadPool: happyThreadPool//共享进程池
        // }),

        // new webpack.DllPlugin({
        //     context: __dirname,
        //     manifest: require('./vendor-manifest.json')
        // }),
        // new CopyWebapckPlugin([{
        //     from: 'static',
        //     to: 'static'
        // }])
    ],
    // optimization:{
    //     //帮我们⾃动做代码分割
    //     splitChunks:{
    //         chunks:"all",//默认是⽀持异步，我们使⽤all
    //         maxInitialRequests: Infinity,
    //         minSize: 300000, // 依赖包超过300000bit将被单独打包
    //         automaticNameDelimiter: '-',
    //         cacheGroups: {
    //             vendor: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name(module) {
    //                     const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
    //                     return `chunk.${packageName.replace('@', '')}`;
    //                 },
    //                 priority: 10
    //             }
    //         }
    //     }
    // },

    // externals: {
    //     ElementUI: 'ElementUI'
    // }
}