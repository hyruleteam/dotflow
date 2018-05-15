import {call, put, takeEvery} from 'redux-saga/effects'
import {fetchProjectList, addProject, showProject, editProject, deleteProject} from '../api/projectList';
import {message} from 'antd';

function fetchFailure() {
  message.error('操作失败', 2);
}

export function * fetchList() {
  try {
    const response = yield call(fetchProjectList);
    yield put({type: 'LOADING_STATUS', status: true});
    yield put({type: 'PROJECTLIST_LIST', list: response});
    yield put({type: 'LOADING_STATUS', status: false});
  } catch (error) {
    yield put(fetchFailure());
  }
}

export function * projectAdd(action) {
  try {
    const response = yield call(addProject, action.data);
    if (response.code === 1) {
      yield message.success('添加成功', 2);
      if(action.modalType === 'git'){
        yield put({type: 'PROJECTLIST_GITMODEL', gitVisible: false});
      }else{
        yield put({type: 'PROJECTLIST_LOCALMODEL', localVisible: false});
      }
      yield put({type: 'PROJECTLIST_REQUEST'});
    }
  } catch (error) {
    yield put(fetchFailure());
  }
}

export function * projectShow(action) {
  try {
    const response = yield call(showProject, action.id);
    if (response.code === 1) {
      if(action.modalType === 'git'){
        yield put({type: 'PROJECTLIST_GITMODEL', gitVisible: true, data: response.data[0], isEdit: true});
      }else{
        yield put({type: 'PROJECTLIST_LOCALMODEL', localVisible: true, data: response.data[0], isEdit: true});
      }
    }
  } catch (error) {
    yield put(fetchFailure());
  }
}

export function * projectEdit(action) {
  try {
    const response = yield call(editProject, action.data);
    if (response.code === 1) {
      yield message.success('编辑成功', 2);
      if(action.modalType === 'git'){
        yield put({type: 'PROJECTLIST_GITMODEL', gitVisible: false});
      }else{
        yield put({type: 'PROJECTLIST_LOCALMODEL', localVisible: false});
      }
      yield put({type: 'PROJECTLIST_REQUEST'});
    }
  } catch (error) {
    yield put(fetchFailure());
  }
}

export function * projectDelete(action) {
  try {
    const response = yield call(deleteProject, action.id);
    if (response.code === 1) {
      yield message.success('删除成功', 2);
      yield put({type: 'PROJECTLIST_REQUEST'});
    }
  } catch (error) {
    yield put(fetchFailure());
  }
}

export function * watchProjectList() {
  yield takeEvery('PROJECTLIST_REQUEST', fetchList)
  yield takeEvery('PROJECTLIST_ADD', projectAdd)
  yield takeEvery('PROJECTLIST_EDIT', projectEdit)
  yield takeEvery('PROJECTLIST_SHOW', projectShow)
  yield takeEvery('PROJECTLIST_DELETE', projectDelete)
}
