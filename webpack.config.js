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
    rules: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        }),
        include: [
          path.join(__dirname, "public"),
          "/node_modules/foundation-sites/scss/"],
      },

    ],
  },
  plugins: [HtmlWebpackPluginConfig, extractScss, PrettierConfig],
};
