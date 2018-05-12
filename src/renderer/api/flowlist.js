import flowlist from './initData/flowlist';
import * as types from '../actions/action-type.js';
import store from '../store.js';

const {remote} = window.require('electron');
const {dbstore} = remote.getGlobal('services');

export function fetchOriginData() {
  return flowlist;
}

export function fetch() {
  store.dispatch({type: types.LOADING_STATUS, status: true});
  return new Promise((resolve, reject) => {
    dbstore
      .flowList
      .find({}, (err, newDoc) => {
        if (err) 
          reject(err);
        setTimeout(() => {
          resolve(newDoc);
          store.dispatch({type: types.LOADING_STATUS, status: false});
        }, 1000);
      });
  });
}
