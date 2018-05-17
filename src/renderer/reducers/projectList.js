import * as types from '../actions/action-type.js';

const projectListReducer = function (state = {}, action) {
  const list = action.list;
  const initVisible = action.initVisible;
  switch (action.type) {
    case types.PROJECTLIST_LIST:
      return {
        ...state,
        list
      };
    case types.PROJECTLIST_INITMODAL:
      return {
        ...state,
        data: action.data,
        initVisible
      };
    case types.PROJECTLIST_INITMODELCONFIRM:
      return {
        ...state,
        status: action.status
      };
    case types.PROJECTLIST_SHOWINITINFO:
      return {
        ...state,
        info: action.info
      };
    default:
      return state
  }
}

export default projectListReducer;
