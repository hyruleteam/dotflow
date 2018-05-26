import { create, getConsolePath } from './window';

const {ipcMain,dialog} = require('electron')
const process = require('process');
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
    titleBarStyle: 'hidden',
  });
  win.loadURL(getConsolePath(id));

  win.on('close', (event)=> {
    dialog.showMessageBox({
      type:'question',
      message:'确定关闭？',
      buttons:['确定','取消'],
      cancelId:1
    },(response)=>{
      if(response === 0){
        win = null;
        if(pid){
          process.kill(pid)
          pid = null;
        }
      }else{
        event.preventDefault()
      }
    })
  });
}