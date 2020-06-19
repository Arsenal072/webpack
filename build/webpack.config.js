const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
    entry: {
        main: ["@babel/polyfill", path.resolve(__dirname, '../src/main.js')],
        backstage: ["@babel/polyfill", path.resolve(__dirname, '../src/backstage.js')],
    },
    output: {
        filename: 'js/[name]_[hash:8].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: 'js/[name]_[chunkhash:8].js',
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
                use: [{
                    loader: 'happypack/loader?id=happyBabel'
                    // use: ['babel-loader', 'eslint-loader'],
                    // options: {
                    //     presets: ['@babel/preset-env']
                    // }
                }],
                // use: {
                //     loader: 'babel-loader',
                //     options: {
                //         presets: ['@babel/preset-env']
                //     }
                // },
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

        new vueLoaderPlugin(),
        new HappyPack({
            id: 'happyBabel',
            loaders: [{
                // loader: 'babel-loader',
                // options: {
                //     presets: ['@babel/preset-env'],
                //     cacheDirectory: true
                // }
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }],
            threadPool: happyThreadPool//共享进程池
        }),
        // new CopyWebpackPlugin([ // 拷贝生成的文件到dist目录 这样每次不必手动去cv
        //     {
        //         from: 'dll',
        //         to: 'dll'
        //     }
        // ]),
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest: path.resolve('dll', 'vendor_manifest.json')
        // }),
        new HardSourceWebpackPlugin()//7.391s
    ],
    optimization: {
        splitChunks: {
            // 表示选择哪些 chunks 进行分割，可选值有：async，initial和all
            chunks: "all",
            // 表示新分离出的chunk必须大于等于minSize，默认为30000，约30kb。
            minSize: 30000,
            // 表示一个模块至少应被minChunks个chunk所包含才能分割。默认为1。
            minChunks: 1,
            // 表示按需加载文件时，并行请求的最大数目。默认为5。
            maxAsyncRequests: 5,
            // 表示加载入口文件时，并行请求的最大数目。默认为3。
            maxInitialRequests: 3,
            // 表示拆分出的chunk的名称连接符。默认为~。如chunk~vendors.js
            automaticNameDelimiter: '~',
            // 设置chunk的文件名。默认为true。当为true时，splitChunks基于chunk和cacheGroups的key自动命名。
            name: true,
            // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块，就分配到该组。模块可以被多个组引用，但最终会根据priority来决定打包到哪个组中。默认将所有来自 node_modules目录的模块打包至vendors组，将两个以上的chunk所共享的模块打包至default组。
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: "cacheGroups"
                },
                // 
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    externals: {
        'vue': 'Vue',
        'element-ui': 'ELEMENT'
    }
}