import {
  applyMiddleware,
  createStore,
} from 'redux';
import createSageMiddleWare from 'redux-saga';
import logger from 'redux-logger';
import reducers from './reducers';
import {rootSaga} from './sagas/sagas';

const sagaMiddleware = createSageMiddleWare();
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(rootSaga)
export default store;
