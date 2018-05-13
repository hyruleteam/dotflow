import * as types from './action-type.js';

export function fetchList(flowlist) {
  return {type: types.FLOWLIST_REQUEST, flowlist};
}

export function showList(flowlist) {
  return {type: types.SHOW, flowlist};
}

export function addData(data) {
  return {type: types.FLOWLIST_ADD, data};
}

export function showData(id) {
  return {type: types.FLOWLIST_SHOW, id};
}

export function editData(data) {
  return {type: types.FLOWLIST_EDIT, data};
}

export function deleteData(id) {
  return {type: types.FLOWLIST_DELETE, id};
}

export function showModal(visible,data={},isEdit=false) {
  return { type: types.FLOWLIST_GITMODEL, visible,data,isEdit};
}