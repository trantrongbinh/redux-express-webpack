const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, '/client/src/index.js'),
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    // style-loader
                    { loader: 'style-loader' },
                    // css-loader
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    // sass-loader
                    { loader: 'sass-loader' },
                    // less-loader
                    { loader: 'less-loader' }
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            }
        ]
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    enforce: true,
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/client/public/index.html'),
            filename: 'index.html',
            title: 'react-redux-expressjs-base'
        })
    ],
    output: {
        filename: 'bundle.js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.join(__dirname, '/client/public/dist')
    }
};
