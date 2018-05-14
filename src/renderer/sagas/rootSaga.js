import {fork} from 'redux-saga/effects'
import { watchFlowList } from "./flowlistSaga";

export function * rootSaga() {
  yield fork(watchFlowList)
}