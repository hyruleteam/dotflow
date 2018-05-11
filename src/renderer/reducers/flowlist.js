import * as types from '../actions/action-type.js';

const flowlistReducer = function(state = {}, action) {
  switch(action.type) {
    case types.SHOW:
      return Object.assign({}, state, { flowlist: action.flowlist });
    default:
      return state
  }
}

export default flowlistReducer;
