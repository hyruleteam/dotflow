'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently ignoring
// them. In the future, promise rejections that are not handled will terminate
// the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config/webpack.config.electron');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

// Create the production build and print the deployment instructions.
function build() {
  console.log('正在编译打包electron-renderer...');

  let compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (process.env.CI && (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false') && messages.warnings.length) {
        console.log(chalk.yellow('\nTreating warnings as errors because process.env.CI = true.\nMost CI servers se' +
            't it automatically.\n'));
        return reject(new Error(messages.warnings.join('\n\n')));
      }

      return resolve({stats, warnings: messages.warnings});
    });
  });
}

build().then(({stats, warnings}) => {
  if (warnings.length) {
    console.log(chalk.yellow('Compiled with warnings.\n'));
    console.log(warnings.join('\n\n'));
    console.log('\nSearch for the ' + chalk.underline(chalk.yellow('keywords')) + ' to learn more about each warning.');
    console.log('To ignore, add ' + chalk.cyan('// eslint-disable-next-line') + ' to the line before.\n');
  } else {
    console.log(stats.toString({
      chunks: false, // 使构建过程更静默无输出
      colors: true // 在控制台展示颜色
    }))
    console.log(chalk.green('✨ 编译 成功.\n'));
  }
});
