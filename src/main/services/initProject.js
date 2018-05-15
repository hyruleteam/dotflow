import {join} from 'path';
import is from 'electron-is';
import {app, dialog} from 'electron';
import log from 'electron-log';

const fs = require('fs');

log.transports.file.level = 'all';

//判断是否为空文件夹
export function checkDirIsEmpty(data) {
  return new Promise(function (resolve, reject) {
    fs.readdir(data.localPath, (error, result) => {
      if (error) {
        reject(error);
      } else {
        if (result === undefined){
          resolve({code: 0, msg: '文件夹不存在'})
        }
        if (!result[0]) {
          resolve({code: 1, msg: '文件夹为空'})
        } else {
          resolve({code: 0, msg: '该文件夹不为空,不能创建项目'})
        }
      }
    });
  });
}

//git clone文件
export async function generateByGit(){

}

//本地生成文件
export async function generateByLocal(){
  
}

//替换package.json模版
export async function generatePackageJson(){
  
}

export function init(data) {
  initpj.checkDirIsEmpty(data)
}