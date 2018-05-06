const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

const plugins = [
    new HtmlWebpackPlugin({
        template: 'src/public/index.html',
        filename: 'public/index.html',
        inject: 'body'
    })
];

module.exports = (env) => {
    const devMode = env !== 'production';
    devMode
        ? null
        : (
            plugins.push(
                new CleanWebpackPlugin(['dist'])
            ),
            plugins.push(
                new CopyWebpackPlugin([
                    {
                        from: path.resolve(__dirname, './src/server'),
                        to: path.resolve(__dirname, './dist/server')
                    }
                ], {
                    ignore: []
                })
            ),
            plugins.push(
                new ExtractTextPlugin('client/style.css')
            ),
            plugins.push(
                new OptimizeJsPlugin({
                    sourceMap: false
                })
            )
        );

    return {
        entry: ((devMode)
            ? [
                'react-hot-loader/patch',
                'webpack-dev-server/client?http://localhost:8080',
                'webpack/hot/only-dev-server'
            ]
            : []).concat(['./src/client/index.js']),
        devtool: devMode ? 'inline-source-map' : 'source-map',
        output: {
            filename: 'client/[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
            sourceMapFilename: '[file].map'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    options: {
                        plugins: devMode
                            ? ['react-hot-loader/babel']
                            : []
                    }
                },
                {
                    test: /^((?!\.?(main|style)).)*s?[ac]ss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader', options: {
                                    camelCase: true,
                                    importLoaders: 2,
                                    localIdentName: '[local]___[hash:7]',
                                    sourceMap: true
                                }
                            }, {
                                loader: 'postcss-loader', options: {
                                    ident: 'postcss',
                                    plugins: () => [
                                        require('autoprefixer')()
                                    ],
                                    sourceMap: true
                                }
                            }, {
                                loader: 'sass-loader', options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    })
                },
                {
                    test: /\.?(main|style).s?[ac]ss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader', options: {
                                    camelCase: true,
                                    importLoaders: 2,
                                    localIdentName: '[local]___[hash:7]',
                                    sourceMap: true
                                }
                            }, {
                                loader: 'postcss-loader', options: {
                                    ident: 'postcss',
                                    plugins: () => [
                                        require('autoprefixer')()
                                    ],
                                    sourceMap: true
                                }
                            }, {
                                loader: 'sass-loader', options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    })
                },
                {
                    test: /\.(png|svg|jp(e*)g|gif)$/,
                    exclude: path.resolve(__dirname, 'src/fonts'),
                    use: [
                        {
                            loader: 'url-loader', options: {
                                limit: 8192,
                                name: devMode
                                    ? null
                                    : 'images/[name].[hash:20].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                    exclude: path.resolve(__dirname, 'src/images'),
                    use: [
                        {
                            loader: 'url-loader', options: {
                                limit: 8192,
                                name: devMode
                                    ? null
                                    : 'fonts/[name].[hash:20].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: plugins
    };
};
