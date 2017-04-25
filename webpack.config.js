/*
 ./webpack.config.js
 */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    title: 'Bloomed',
    template: './public/index.html',
    filename: 'index.html',
    inject: 'body'
});

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractScss = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: process.env.NODE_ENV == 'development'
})

module.exports = {
    devServer: {
        historyApiFallback: true
    },
    entry: [
        './public/index'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    devtool: "source-map",
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract({
                    loader: [
                        {loader: 'css-loader'},
                        {loader: 'sass-loader'}
                    ]
                })
            }
        ]
    },
    plugins: [HtmlWebpackPluginConfig, extractScss]
}