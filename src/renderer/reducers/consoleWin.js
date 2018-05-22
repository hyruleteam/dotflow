import * as types from '../actions/action-type.js';

const consoleWinReducer = function (state = {}, action) {
  console.log(action.terminalStatus)
  switch (action.type) {
    case types.CONSOLEWIN_TERMINALSTATUS:
      return {
        ...state,
        terminalStatus: action.terminalStatus,
      };
    default:
      return state
  }
}

export default consoleWinReducer;
