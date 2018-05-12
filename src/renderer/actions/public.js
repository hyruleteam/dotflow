import * as types from './action-type.js';

export function loading_status(status) {
  return {type: types.LOADING_STATUS, status};
}