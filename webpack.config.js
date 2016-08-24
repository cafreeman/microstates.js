const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const LIB_NAME = 'microstates';

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  src: path.join(__dirname, 'src'),
  lib: path.join(__dirname, 'lib'),
  test: path.join(__dirname, 'test')
}

const commonConfig = {
  entry: PATHS.src,
  output: {
    path: PATHS.lib,
    filename: LIB_NAME + '.js',
    library: LIB_NAME,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules)/,
      }
    ]
  },
};

const buildConfig = {
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['lib'], {
      root: process.cwd()
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};

const devConfig = {
  devtool: 'eval-source-map',
};

var config;

switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(commonConfig, buildConfig);
    break;
  default:
    config = merge(commonConfig, devConfig);
}

module.exports = validate(config);
