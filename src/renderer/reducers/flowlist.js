import * as types from '../actions/action-type.js';

const flowlistReducer = function (state = {}, action) {
  const list = action.list;
  const gitVisible = action.gitVisible;
  const localVisible = action.localVisible;
  switch (action.type) {
    case types.FLOWLIST_LIST:
      return {
        ...state,
        list
      };
    case types.FLOWLIST_GITMODEL:
      return {
        ...state,
        isEdit: action.isEdit,
        data: action.data,
        gitVisible,
        modalType: action.modalType
      };
    case types.FLOWLIST_LOCALMODEL:
      return {
        ...state,
        isEdit: action.isEdit,
        data: action.data,
        localVisible,
        modalType: action.modalType
      };
    case types.FLOWLIST_CREATEMODEL:
      return {
        ...state,
        data: action.data,
        createVisible:action.createVisible,
      };
    default:
      return state
  }
}

export default flowlistReducer;
