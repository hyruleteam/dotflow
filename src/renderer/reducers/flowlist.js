import * as types from '../actions/action-type.js';

const flowlistReducer = function (state = {}, action) {
  const list = action.flowlist;
  const status = action.status;
  switch (action.type) {
    case types.SHOW:
      return {
        ...state,
        list
      };
    case types.LOADING_STATUS:
      return {
        ...state,
        status
      };
    default:
      return state
  }
}

export default flowlistReducer;
