import { call, put, fork, takeEvery } from 'redux-saga/effects'
import {fetchFlowList,addFlowList} from '../api/flowlist';
import { message } from 'antd';

function fetchFailure(){
  console.log('fetchFailure')
}

export function* rootSaga() {
  yield fork(watchFetchList)
}

export function* fetchList() {
  try {
    const response = yield call( fetchFlowList );
    yield put({ type: 'SHOW', flowlist: response });
  } catch (error) {
    yield put(fetchFailure());
  }
}

export function* flowListAdd(action) {
  try {
    const response = yield call( addFlowList, action.data );
    if(response.code === 1){
      yield message.success('添加成功',2);
      yield put({ type: 'FLOWLIST_GITMODEL', visible:false});
      yield put({ type: 'FLOWLIST_REQUEST'});
    }
  } catch (error) {
    yield put(fetchFailure());
  }
}

export function* watchFetchList() {
  yield takeEvery('FLOWLIST_REQUEST', fetchList)
  yield takeEvery('FLOWLIST_ADD', flowListAdd)
}

