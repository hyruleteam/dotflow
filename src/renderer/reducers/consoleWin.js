import * as types from '../actions/action-type.js';

const consoleWinReducer = function (state = {}, action) {
  switch (action.type) {
    case types.CONSOLEWIN_TERMINALSTATUS:
      return {
        ...state,
        terminalStatus: action.terminalStatus,
        terminalContent:action.terminalContent
      };
    default:
      return state
  }
}

export default consoleWinReducer;
