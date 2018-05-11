import * as types from './action-type.js';

export function show(flowlist) {
  return {
    type: types.SHOW,
    flowlist
  };
}
