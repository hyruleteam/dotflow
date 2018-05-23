import * as types from './action-type.js';

export function changeTerminalStatus(terminalStatus,terminalContent) {
  return {type: types.CONSOLEWIN_TERMINALSTATUS, terminalStatus,terminalContent};
}