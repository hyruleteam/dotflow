import * as types from './action-type.js';

export function fetchList(list=[]) {
  return {type: types.FLOWLIST_REQUEST, list};
}

export function showList(list=[]) {
  return {type: types.FLOWLIST_LIST, list};
}

export function addData(data,modalType) {
  return {type: types.FLOWLIST_ADD, data,modalType};
}

export function showData(id,modalType) {
  return {type: types.FLOWLIST_SHOW, id,modalType};
}

export function editData(data,modalType) {
  return {type: types.FLOWLIST_EDIT, data,modalType};
}

export function deleteData(id) {
  return {type: types.FLOWLIST_DELETE, id};
}

export function showGitModal(gitVisible,data={},isEdit=false) {
  return { type: types.FLOWLIST_GITMODEL, gitVisible,data,isEdit};
}

export function showLocalModal(localVisible,data,isEdit=false,) {
  return { type: types.FLOWLIST_LOCALMODEL, localVisible,data,isEdit};
}