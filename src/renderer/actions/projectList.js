import * as types from './action-type.js';

export function fetchList(list=[]) {
  return {type: types.PROJECTLIST_REQUEST, list};
}

export function showList(list=[]) {
  return {type: types.PROJECTLIST_LIST, list};
}

export function addData(data,modalType) {
  return {type: types.PROJECTLIST_ADD, data,modalType};
}

export function showData(id,modalType) {
  return {type: types.PROJECTLIST_SHOW, id,modalType};
}

export function editData(data,modalType) {
  return {type: types.PROJECTLIST_EDIT, data,modalType};
}

export function deleteData(id) {
  return {type: types.PROJECTLIST_DELETE, id};
}

export function showInitModal(initVisible,data) {
  return { type: types.PROJECTLIST_INITMODAL, initVisible,data};
}

export function showInitModalConfirm(status) {
  return { type: types.PROJECTLIST_INITMODELCONFIRM, status};
}

export function showInitInfo(info="") {
  return { type: types.PROJECTLIST_SHOWINITINFO, info};
}

export function initComplete(data) {
  return { type: types.PROJECTLIST_INITCOMPLETE, data};
}