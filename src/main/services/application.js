import { create, getPath } from './window';

export function init() {
  global.win = create({
    width: 1000,
    height: 680,
    minWidth: 1000,
    minHeight: 680,
    titleBarStyle: 'hidden',
  });
  global.win.loadURL(getPath());
}
