import {join} from 'path';
import is from 'electron-is';
import {app, dialog} from 'electron';
import log from 'electron-log';

log.transports.file.level = 'all';
const fs = require('fs');
var initpj = {
  checkDirIsEmpty(data) {
    fs.readdir(data.localPath, function (err, fileArr) {
        if (fileArr === undefined) 
          return;
        //如果该目录下还有文件或目录 , 判断查看它们的信息
        if (!fileArr[0]) {
          log.info('空文件夹')
        }else{
          log.info('该目录下有文件')
        }
      });
  }
}

export function init(data) {
  initpj.checkDirIsEmpty(data)
}