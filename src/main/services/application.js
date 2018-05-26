import { create, getPath } from './window';

export function init() {
  let win = create({
    width: 1000,
    height: 680,
    minWidth: 1000,
    minHeight: 680,
    titleBarStyle: 'hidden',
    icon:__dirname + '/app/assets/img/128.png'
  });
  win.loadURL(getPath());
}
