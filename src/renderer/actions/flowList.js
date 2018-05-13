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

export function showData(id,data) {
  return {type: types.FLOWLIST_SHOW, id, data};
}

export function editData(data) {
  return {type: types.FLOWLIST_EDIT, data};
}

export function showModal(visible) {
  return { type: types.FLOWLIST_GITMODEL, visible};
}