import {create, getConsolePath} from './window';
import log from 'electron-log';

const {ipcMain, dialog} = require('electron')
const exec = require('child_process').exec;
const process = require('process');
const shell = require('shelljs');
let pid = null;

ipcMain.on('send-pid', (event, arg) => {
  pid = arg
})

export function init(id) {
  let win = create({
    width: 300,
    height: 580,
    minWidth: 300,
    minHeight: 580,
    maxWidth: 600,
    maxHeight: 580,
    frame: false,
    show: false,
    titleBarStyle: 'hidden'
  });
  win.loadURL(getConsolePath(id));

  win.on('close', (event) => {
    dialog.showMessageBox({
      type: 'question',
      message: '确定关闭？',
      buttons: [
        '确定', '取消'
      ],
      cancelId: 1
    }, (response) => {
      if (response === 0) {
        win = null;
        if (pid) {
          process.kill(pid)
          pid = null;
        }
      } else {
        event.preventDefault()
      }
    })
  });
}

export function rumCommand(command, projectDir) {
  log.info(`运行命令:${command}`)
  return new Promise(function (resolve, reject) {
    shell.cd(projectDir)
    let version = shell.exec(`${command}`, { async: true, silent: true});
    shell.exec(`${command}`, (code, stdout, stderr) => {
      if (stderr) {
        reject({code: 0, msg: stderr});
      } else {
        log.info("运行成功！")
        resolve({code: 1, msg: stdout})
      }
    })
  });
}
