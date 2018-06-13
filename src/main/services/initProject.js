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

//判断文件夹是否存在
export function checkDirExists(data) {
  return new Promise(function (resolve, reject) {
    fs.pathExists(`${data.allPath}`, (err, exists) => {
      if (!exists) {
        resolve({code: 1, msg: '文件夹不存在'})
      } else {
        reject({code: 0, msg: '文件夹已存在'})
      }
    })
  });
}

//git clone文件
export async function generateByGit(data) {
  const tmpInfo = data.templateData
  const reg = /\.git$/;
  const file_name = /(.*\/)*([^.]+).*/ig;
  if (tmpInfo.type === 'git') {
    return new Promise(function (resolve, reject) {
      if (!reg.test(tmpInfo.tempURL)) {
        reject({code: 0, msg: '不是正确的git地址'})
        return;
      }
      log.info("开始clone模版")
      exec(`git clone ${tmpInfo.tempURL} ${data.name}`, {
        cwd: data.localPath
      }, (err, out) => {
        if (err) {
          reject({code: 0, msg: err});
        }
        log.info("clone成功")
        resolve({code: 1, msg: 'clone成功'})
      });
    });
  }
}

//清除git信息
export function cleanGitFile(data) {
  const projectDir = `${data.allPath}`;
  log.info("开始清除git信息")
  return new Promise(function (resolve, reject) {
    fs.remove(`${projectDir}/.git`, err => {
      if (err) {
        reject({code: 0, msg: err});
      }
      resolve({code: 1, msg: '清除成功！'})
    })
  });
}

//本地生成文件
export async function generateByLocal(data) {
  const tmpInfo = data.templateData;
  const targetDir = `${data.allPath}`;
  if (tmpInfo.type === 'local') {
    return new Promise(function (resolve, reject) {
      fs.copy(tmpInfo.localPath, targetDir, err => {
        if (err) {
          reject({code: 0, msg: err})
          return;
        }
        log.info("复制成功")
        resolve({code: 1, msg: '复制成功'})
      })
    });
  }
}

//替换package.json模版
export async function generatePackageJson(data) {
  const jsonFile = `${data.allPath}/package.json`;
  log.info("开始替换package.json模版")
  return new Promise(function (resolve, reject) {
    const {name, description, author} = data;
    fs.readJson(jsonFile, (err, packageObj) => {
      if (err)
        reject({code: 1, msg: err})
      packageObj.name = name;
      packageObj.description = description;
      packageObj.author = author;

      fs.writeJson(jsonFile, packageObj, err => {
        if (err)
          reject({code: 1, msg: err})
        log.info('替换成功！')
        resolve({code: 1, msg: '替换成功！'})
      })
    })
  });
}

//npm 安装
export async function runNpm(data) {
  const projectDir = `${data.allPath}`;
  log.info("开始npm 安装")
  return new Promise(function (resolve, reject) {
    exec('npm install', {
      cwd: projectDir
    }, (err, out) => {
      if (err) {
        reject({code: 0, msg: err});
      } else {
        log.info("安装成功！")
        resolve({code: 1, msg: out})
      }
    });
  });
}

export function init(data) {
  initpj.checkDirIsEmpty(data)
}
