import * as types from '../actions/action-type.js';

const flowlistReducer = function (state = {}, action) {
  const list = action.flowlist;
  const visible = action.visible;
  switch (action.type) {
    case types.FLOWLIST_LIST:
      return {
        ...state,
        list
      };
    case types.FLOWLIST_GITMODEL:
      return {
        ...state,
        isEdit:action.isEdit,
        data:action.data,
        visible
      };
    default:
      return state
  }
}

export default flowlistReducer;
