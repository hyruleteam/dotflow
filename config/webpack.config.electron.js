const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');
module.exports = {
  target: 'electron-renderer',
  entry: {
    main: './src/main/index.js'
  },
  output: {
    path: paths.appBuild,
    filename: '[name].js'
  },
  externals(context, request, callback) {
    callback(null, request.charAt(0) === '.'
      ? false
      : `require("${request}")`);
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [new webpack.DefinePlugin({$dirname: '__dirname'})]
};
