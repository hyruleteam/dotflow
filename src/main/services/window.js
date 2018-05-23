import is from 'electron-is';
import {join} from 'path';
import {BrowserWindow} from 'electron';

let count = 0;

export function create(opts) {
  count += 1;
  let win = new BrowserWindow(opts);
  win.once('ready-to-show', () => {
    win.show()
  })
  win.on('close', () => {
    count -= 1;
    win = null;
  });
  return win;
}

export function getCount() {
  return count;
}

export function getPath() {
  let path = `file://${join($dirname, '..', 'dist')}/index.html`;
  if (is.dev()) {
    path = 'http://127.0.0.1:3000';
  }
  return path;
}

export function getConsolePath(id) {
  let path = `file://${join($dirname, '..', 'dist')}/index.html#/consoleWin/${id}`;
  if (is.dev()) {
    path = `http://127.0.0.1:3000/#/consoleWin/${id}`;
  }
  return path;
}
