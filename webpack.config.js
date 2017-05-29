/*
 ./webpack.config.js
 */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PrettierPlugin = require('prettier-webpack-plugin');

const PrettierConfig = new PrettierPlugin({
  singleQuote: true,
  extensions: ['.js', '.jsx'],
});

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin(
  {
    title: 'Bloomed',
    template: './public/index.html',
    filename: 'index.html',
    inject: 'body',
  });

const extractScss = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development',
});


module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  entry: [
    './public/index',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract({
          loader: [
            { loader: 'css-loader' },
            { loader: 'sass-loader', options: {
              sourceMap: true,
              includePaths: [
                path.resolve(__dirname, 'node_modules/foundation/scss'),
              ]
            }},
          ],
        }),
      },
    ],
  },
  plugins: [HtmlWebpackPluginConfig, extractScss, PrettierConfig],
};
