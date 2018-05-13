import flowlist from './initData/flowlist';
import * as types from '../actions/action-type.js';
import store from '../store.js';

const {remote} = window.require('electron');
const {dbstore} = remote.getGlobal('services');

// dbstore.flowList.update({ _id: 'vSD2ifhx0oEmxx8u' }, { $set: { isDefault: 0 } }, function (err, numReplaced) {
//   // numReplaced = 3
//   // Field 'system' on Mars, Earth, Jupiter now has value 'solar system'
// });

export function fetchFlowList() {
  store.dispatch({type: types.LOADING_STATUS, status: true});
  return new Promise((resolve, reject) => {
    dbstore
      .flowList
      .find({}, (err, newDoc) => {
        if (err)
          reject(err);
        setTimeout(() => {
          resolve([...flowlist,...newDoc]);
          store.dispatch({type: types.LOADING_STATUS, status: false});
        }, 500);
      });
  });
}

export function addFlowList(data){
  return new Promise((resolve, reject) => {
    dbstore
      .flowList
      .insert({...data}, (err, newDoc) => {
        if (err){
          reject(err);
        }
        resolve({code:1,data:{...newDoc}});
      });
  });
}
