import * as types from './action-type.js';

export function changeTerminalStatus(terminalStatus) {
  return {type: types.CONSOLEWIN_TERMINALSTATUS, terminalStatus};
}