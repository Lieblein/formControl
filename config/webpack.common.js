const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const helpers = require('./helpers');

const webpackConfig = function (options) {
    const env = options.env;
    const folder = options.folder || '';

    const isProd = env === 'production';

    return {
        mode: isProd ? 'production' : 'development',
        entry: {
            app: [helpers.root('src', 'index.tsx')]
        },
        output: {
            path: helpers.root('build'),
            publicPath: isProd ? '' : '/',
            filename: isProd ? `${folder}[chunkhash].[name].js` : `${folder}[name].js`
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            modules: [
                helpers.root('src'),
                helpers.root('node_modules')
            ]
        },
        module: {
            rules: [
                // scripts
                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader',
                    include: [
                        helpers.root('src')
                    ]
                },
                // styles
                {
                    test: /\.p?css$/,
                    use: [
                        'style-loader',
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: helpers.root('config')
                                }
                            }
                        }
                    ]
                },
                // images
                {
                    test: /\.(jpe?g|png|gif)$/,
                    use: {
                        loader: 'file-loader',
                        options: { name: folder + '[name].[ext]' }
                    },
                    include: [
                        helpers.root('src')
                    ]
                },
                {
                    test: /\.(svg)$/,
                    use: {
                        loader: 'svg-sprite-loader',
                        options: { name: folder + '[name].[ext]' }
                    },
                    include: [
                        helpers.root('src')
                    ]
                },
                // fonts
                {
                    test: /.(eot)$/,
                    use: {
                        loader: 'file-loader',
                        options: { mimetype: 'application/vnd.ms-fontobject', name: folder + '[name].[ext]' }
                    }
                },
                {
                    test: /.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: {
                        loader: 'file-loader',
                        options: { mimetype: 'application/font-woff', name: folder + '[name].[ext]' }
                    }
                },
                {
                    test: /.(ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: {
                        loader: 'file-loader',
                        options: { mimetype: 'application/octet-stream', name: folder + '[name].[ext]' }
                    }
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader?minimize=false'
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(options.env)
            }),
            new HtmlWebpackPlugin({
                inject: 'body',
                template: 'src/stub.html'
            })
            // uncomment if you want to load only `moment/locale/ru.js`
            // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/)
        ]
    };
};

module.exports = webpackConfig;
