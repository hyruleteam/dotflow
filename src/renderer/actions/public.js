import * as types from './action-type.js';

export function loadingStatus(status) {
  return {type: types.LOADING_STATUS, status};
}

export function operateSuccess() {
  return {type: types.OPERATE_SUCCESS};
}

export function operateFailed() {
  return {type: types.OPERATE_FAILED};
}