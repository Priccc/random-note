const path = require('path');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.js');

const mainConfig = {
  mode: 'development',
  entry: {
    "bundle": path.resolve(__dirname, '..', 'src', 'index.tsx')
  },
  target: 'electron-renderer',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: "[name].[fullhash].js"
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, '..', 'public')
    },
    compress: true,
    host: '127.0.0.1',
    port: 7001,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'public', 'index.html'),
      chunks: ['bundle']
    })
  ]
}

module.exports = webpackMerge.merge(baseConfig, mainConfig);