import * as types from './action-type.js';

export function show(flowlist) {
  return {type: types.SHOW, flowlist};
}

export function model_show(visible) {
  return { type: types.FLOWLIST_GITMODEL, visible};
}