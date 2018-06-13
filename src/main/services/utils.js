import {join} from 'path';
import is from 'electron-is';
import {app, dialog} from 'electron';
import log from 'electron-log';

// const fs = require('fs');
const fs = require('fs-extra')
const os = require('os');
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const process = require('process');

process.env.PATH = process.env.PATH + ':/usr/local/bin';

log.transports.file.level = 'all';

//读取package.json
export async function readPackageJson(data) {
  const jsonFile = `${data.allPath}/package.json`;
  log.info("开始读取package.json模版")
  return new Promise(function (resolve, reject) {
    const {name, description, author} = data;
    fs.readJson(jsonFile, (err, packageObj) => {
      if (err)
        reject({code: 0, msg: err})
      resolve({code: 1, msg: packageObj})
    })
  });
}
