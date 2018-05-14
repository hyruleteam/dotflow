import {call, put, takeEvery} from 'redux-saga/effects'
import {fetchFlowList, addFlowList, showFlowList, editFlowList, deleteFlowList} from '../api/flowlist';
import {message} from 'antd';

function fetchFailure() {
  message.error('操作失败', 2);
}

export function * fetchList() {
  try {
    const response = yield call(fetchFlowList);
    yield put({type: 'FLOWLIST_LIST', flowlist: response});
  } catch (error) {
    yield put(fetchFailure());
  }
}

export function * flowListAdd(action) {
  try {
    const response = yield call(addFlowList, action.data);
    if (response.code === 1) {
      yield message.success('添加成功', 2);
      if(action.modalType === 'git'){
        yield put({type: 'FLOWLIST_GITMODEL', gitVisible: false});
      }else{
        yield put({type: 'FLOWLIST_LOCALMODEL', localVisible: false});
      }
      yield put({type: 'FLOWLIST_REQUEST'});
    }
  } catch (error) {
    yield put(fetchFailure());
  }
}

export function * flowItemShow(action) {
  try {
    const response = yield call(showFlowList, action.id);
    if (response.code === 1) {
      if(action.modalType === 'git'){
        yield put({type: 'FLOWLIST_GITMODEL', gitVisible: true, data: response.data[0], isEdit: true});
      }else{
        yield put({type: 'FLOWLIST_LOCALMODEL', localVisible: true, data: response.data[0], isEdit: true});
      }
    }
  } catch (error) {
    yield put(fetchFailure());
  }
}

export function * flowListEdit(action) {
  try {
    const response = yield call(editFlowList, action.data);
    if (response.code === 1) {
      yield message.success('编辑成功', 2);
      if(action.modalType === 'git'){
        yield put({type: 'FLOWLIST_GITMODEL', gitVisible: false});
      }else{
        yield put({type: 'FLOWLIST_LOCALMODEL', localVisible: false});
      }
      yield put({type: 'FLOWLIST_REQUEST'});
    }
  } catch (error) {
    yield put(fetchFailure());
  }
}

export function * flowListDelete(action) {
  try {
    const response = yield call(deleteFlowList, action.id);
    if (response.code === 1) {
      yield message.success('删除成功', 2);
      yield put({type: 'FLOWLIST_REQUEST'});
    }
  } catch (error) {
    yield put(fetchFailure());
  }
}

export function * watchFlowList() {
  yield takeEvery('FLOWLIST_REQUEST', fetchList)
  yield takeEvery('FLOWLIST_ADD', flowListAdd)
  yield takeEvery('FLOWLIST_EDIT', flowListEdit)
  yield takeEvery('FLOWLIST_SHOW', flowItemShow)
  yield takeEvery('FLOWLIST_DELETE', flowListDelete)
}
