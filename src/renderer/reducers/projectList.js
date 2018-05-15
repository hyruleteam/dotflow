import * as types from '../actions/action-type.js';

const projectListReducer = function (state = {}, action) {
  const list = action.list;
  const localVisible = action.localVisible;
  switch (action.type) {
    case types.PROJECTLIST_LIST:
      return {
        ...state,
        list
      };
    case types.PROJECTLIST_LOCALMODEL:
      return {
        ...state,
        isEdit: action.isEdit,
        data: action.data,
        localVisible,
        modalType: action.modalType
      };
    default:
      return state
  }
}

export default projectListReducer;
