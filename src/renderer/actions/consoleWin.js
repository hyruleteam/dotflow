import * as types from './action-type.js';

export function changeTerminalStatus(terminalStatus,terminalContent) {
  return {type: types.CONSOLEWIN_TERMINALSTATUS, terminalStatus,terminalContent};
}

export function showGitModal(gitVisible) {
    return { type: types.CONSOLEWIN_GITMODAL, gitVisible};
}
