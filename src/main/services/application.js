import { create, getPath } from './window';

export function init() {
  let win = create({
    width: 1000,
    height: 680,
    minWidth: 1000,
    minHeight: 680,
    show: false,
    titleBarStyle: 'hidden',
  });
  win.loadURL(getPath());
}
