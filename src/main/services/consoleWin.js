import { create, getConsolePath } from './window';

export function init() {
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
  win.loadURL(getConsolePath());
}