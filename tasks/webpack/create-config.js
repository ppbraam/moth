const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const config = require('../config');

function createConfig() {
    const staticFolder = 'static/';
    const rootPath = path.resolve(__dirname, '../');
    const { hmrEnabled, production } = config;

    return {
        // set the context of the config to the root
        context: rootPath,
        // set the entry files and babel-polyfill
        // if HMR is enabled insert the reloading/injection script needed
        entry: [
            hmrEnabled && 'webpack-hot-middleware/client?reload=true',
            'babel-polyfill',
            `./${path.relative(rootPath, config.folders.source)}`,
        ].filter(Boolean),
        // set the output of the generated files
        output: {
            path: config.folders.build,
            filename: `${staticFolder}[name].bundle.js`,
            publicPath: config.publicPath,
        },
        // set how the modules are resolved when imported.
        // .jsx and .js are searched by default without specifying
        // a file extension on importing
        resolve: {
            extensions: ['.jsx', '.js'],
            alias: {
                source: config.folders.source,
            },
        },
        // set the module loaders by extension
        module: {
            loaders: [
                {
                    test: /.jsx?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                plugins: ['react-hot-loader/babel'],
                            },
                        },
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /.s?css$/,
                    use: ExtractTextWebpackPlugin.extract({
                        fallback: {
                            loader: require.resolve('style-loader'),
                            options: {
                                singleton: true,
                            },
                        },
                        use: [
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    sourceMap: true,
                                    minimize: true,
                                },
                            },
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    sourceMap: true,
                                    plugins: [
                                        autoprefixer(),
                                    ],
                                },
                            },
                            {
                                loader: require.resolve('sass-loader'),
                                options: {
                                    sourceMap: true,
                                    includePaths: [config.folders.source],
                                },
                            },
                        ],
                    }),
                },
            ],
        },
        plugins: [
            hmrEnabled && new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(production ? 'production' : 'development'),
                },
            }),
            new ExtractTextWebpackPlugin(`${staticFolder}style.css`),
            new HtmlWebpackPlugin({
                template: path.resolve(config.folders.public, './index.html'),
                inject: true,
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks(module) {
                    return module.context && module.context.indexOf('node_modules') !== -1;
                },
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'runtime',
                minChunks: Infinity,
            }),
            production && new webpack.optimize.ModuleConcatenationPlugin(),
            production && new webpack.optimize.UglifyJsPlugin(),
        ].filter(Boolean),
        devtool: production ? 'source-map' : 'eval',
    };
}

module.exports = {
    createConfig,
};
