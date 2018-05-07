import webpack from 'webpack';
import path from 'path';

const outputPath = path.join(__dirname, 'app', 'dist');
export default {
  target: 'electron-renderer',
  entry: {
    main: './src/main/index.js',
  },
  output: {
    path: outputPath,
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
  plugins: [new webpack.DefinePlugin({ $dirname: '__dirname' })]
};
