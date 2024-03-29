const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'production', // change to development for dev environment
    entry: path.join(__dirname, '/client/src/index.js'),
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                use: 'babel-loader'
            },
            {
                test: /\.(css|scss|les)$/,
                use: [
                    // style-loader
                    { loader: 'style-loader' }, // change to MiniCssExtractPlugin.loader to create a css module
                    // css-loader
                    {
                        loader: 'css-loader',
                        // options: {
                        //     modules: true // Enable CSS Modules
                        // }
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
        runtimeChunk: true,
        moduleIds: 'hashed',
        splitChunks: {
            chunks: 'all',
            minSize: 50000,
            maxSize: 512000, // size in bytes
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    enforce: true
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
        }),
        new MiniCssExtractPlugin(),
        new OptimizeCssAssetsPlugin()
    ],
    output: {
        filename: '[name].[chunkhash].bundle.js',
        chunkFilename: '[name].[chunkhash].chunk.js',
        path: path.join(__dirname, '/client/public/dist')
    },
    devServer: {
        contentBase: path.join(__dirname, '/client/public/dist'),
        watchContentBase: true,
        compress: true,
        headers: {
            'author': 'TTB'
        },
        open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        port: 1997,
        publicPath: 'http://localhost:1997/',
        hot: true
    },
    performance: {
        hints: false
    },
};
