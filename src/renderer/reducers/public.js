import * as types from '../actions/action-type.js';

const publicReducer = function (state = {}, action) {
  const list = action.flowlist;
  switch (action.type) {
    case types.SHOW:
      return {
        ...state,
        list
      };
    default:
      return state
  }
}

export default publicReducer;
