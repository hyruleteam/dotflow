import {fork} from 'redux-saga/effects'
import { watchFlowList } from "./flowlistSaga";
import { watchProjectList } from "./projectListSaga";

export function * rootSaga() {
  yield fork(watchFlowList)
  yield fork(watchProjectList)
}