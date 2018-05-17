import {join} from 'path';
import is from 'electron-is';
import {app, dialog} from 'electron';
import log from 'electron-log';

const fs = require('fs');
const os = require('os');
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;

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

//判断文件夹是否存在
export function checkDirExists(data) {
  return new Promise(function (resolve, reject) {
    fs.stat(`${data.localPath}/${data.name}`, (error, stats) => {
      if (!stats) {
        resolve({code: 1, msg: '文件夹不存在'})
      } else {
        reject({code: 0, msg: '文件夹已存在'})
      }
    });
  });
}

//git clone文件
export async function generateByGit(data){
  const tmpInfo = data.templateData
  const reg = /\.git$/;
  const file_name= /(.*\/)*([^.]+).*/ig;
  if(tmpInfo.type === 'git'){
    return new Promise(function (resolve, reject) {
      if(!reg.test(tmpInfo.tempURL)){
        reject({
          code:0,
          msg:'不是正确的git地址'
        })
        return;
      }
      log.info("开始clone模版")
      exec(`git clone ${tmpInfo.tempURL} ${data.name}`,{cwd: data.localPath}, (err, out) => {
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
export function cleanGitFile(data){
  const projectDir = `${data.localPath}/${data.name}`;
  log.info("开始清除git信息")
  return new Promise(function (resolve, reject) {
    if(os.platform() === 'darwin'){
      exec(`rm -rf .git`,{cwd: projectDir}, (err, out) => {
        if (err) {
          reject({code: 0, msg: err});
        } else {
          log.info("清除成功！")
          resolve({code: 1, msg: '清除成功！'})
        }
      });
    }else if(os.platform() === 'win32'){
      exec('rd/s/q .git',{cwd: projectDir}, (err, out) => {
        if (err) {
          reject({code: 0, msg: err});
        } else {
          log.info("清除成功！")
          resolve({code: 1, msg: '清除成功！'})
        }
      });
    }
  });
}

//本地生成文件
export async function generateByLocal(data){
  
}

//替换package.json模版
export async function generatePackageJson(data){
  const jsonFile = `${data.localPath}/${data.name}/package.json`;
  log.info("开始替换package.json模版")
  return new Promise(function (resolve, reject) {
    fs.readFile(jsonFile, 'utf8', (err, fileinfo) => {
        if (err) reject({code: 1, msg: '文件不存在'})

        let newData = fileinfo.replace(/<%= name %>/,data.name)
        .replace(/<%= description %>/,data.description)
        .replace(/<%= author %>/,data.author)

        fs.writeFile(jsonFile, newData, (err) => {
            if (err) reject({code: 1, msg: '文件不存在'})
            log.info('替换成功！')
            resolve({code: 1, msg: '替换成功！'})
        });
    });
  });
}

//npm 安装
export async function runNpm(data){
  const projectDir = `${data.localPath}/${data.name}`;
  log.info("开始npm 安装")
  return new Promise(function (resolve, reject) {
    exec('npm install',{cwd: projectDir},(err,out) => {
      if (err) {
        reject({code: 0, msg: err});
      } else {
        log.info("安装成功！")
        resolve({code: 1, msg: out})
      }
    });
  });
}

// export async function runNpm(data){
//   const projectDir = `${data.localPath}/${data.name}`;
//   log.info("开始npm 安装")
//   return new Promise(function (resolve, reject) {
//     const ls = spawn('gulp',{cwd: projectDir});
//       ls.stdout.on('data', function (stdoutData) {
//         console.log(stdoutData.toString())
//         global.win.webContents.send('ping',stdoutData.toString())
//       })
//     ls.stderr.on('data', function (err) {
//       console.log('stderr: ' + err)
//     })
//     ls.once('close', function () {
//       console.log('install success...')
//     })
//   });
// }

export function init(data) {
  initpj.checkDirIsEmpty(data)
}