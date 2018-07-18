import * as types from '../actions/action-type.js';

const consoleWinReducer = function (state = {}, action) {
    switch (action.type) {
        case types.CONSOLEWIN_TERMINALSTATUS:
            return {
                ...state,
                terminalStatus: action.terminalStatus,
                terminalContent: action.terminalContent
            };
        case types.CONSOLEWIN_GITMODAL:
            return {
                ...state,
                gitVisible: action.gitVisible
            };
        case types.CONSOLEWIN_GITREMOTEMODAL:
            return {
                ...state,
                gitRemoteVisible: action.gitRemoteVisible
            };
        default:
            return state
    }
}

export default consoleWinReducer;
