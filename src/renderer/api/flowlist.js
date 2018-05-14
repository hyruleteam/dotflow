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

export function showFlowList(id){
  return new Promise((resolve, reject) => {
    dbstore
      .flowList
      .find({_id:id}, (err, docs) => {
        if (err){
          reject(err);
        }
        resolve({code:1,data:{...docs}});
      });
  });
}

export function editFlowList(data){
  return new Promise((resolve, reject) => {
    dbstore
      .flowList
      .update({_id:data._id},{ $set: { ...data.values } }, (err, numReplaced) => {
        if (err){
          reject(err);
        }
        resolve({code:1,data:{...numReplaced}});
      });
  });
}

export function deleteFlowList(id){
  return new Promise((resolve, reject) => {
    dbstore
      .flowList
      .remove({_id:id},{ }, (err, numRemoved) => {
        if (err){
          reject(err);
        }
        resolve({code:1,data:{...numRemoved}});
      });
  });
}

export function chooseFir(){
  return new Promise((resolve, reject) => {
    remote.dialog.showOpenDialog({properties: ['openDirectory']},(filePaths) => {
      resolve({code:1,data:filePaths});  
    })
  });
}
