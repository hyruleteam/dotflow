import * as types from '../actions/action-type.js';

const publicReducer = function (state = {}, action) {
  const status = action.status;
  console.log(status)
  switch (action.type) {
    case types.LOADING_STATUS:
      return {
        ...state,
        status
      };
    default:
      return state
  }
}

export default publicReducer;
