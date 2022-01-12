const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const mainConfig = {
  mode: 'production',
  entry: path.resolve(__dirname, '..', 'main.ts'),
  target: 'electron-main',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: "electron.js"
  },
  devtool: "source-map",
  externals: {
    fsevents: "require('fsevents')"
  }
}

module.exports = webpackMerge.merge(baseConfig, mainConfig);