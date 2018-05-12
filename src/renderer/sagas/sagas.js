import { call, put, fork, takeEvery } from 'redux-saga/effects'
import {fetch} from '../api/flowlist';


function fetchFailure(){
  console.log('fetchFailure')
}

export function* rootSaga() {
  yield fork(watchFetchList)
}

export function* fetchList() {
  try {
    const response = yield call( fetch );
    yield put({ type: 'SHOW', flowlist: response });
  } catch (error) {
    yield put(fetchFailure());
  }
}

export function* watchFetchList() {
  yield takeEvery('FLOWLIST_REQUEST', fetchList)
}

