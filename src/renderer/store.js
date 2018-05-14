import {
  applyMiddleware,
  createStore,
} from 'redux';
import createSageMiddleWare from 'redux-saga';
import logger from 'redux-logger';
import reducers from './reducers';
import {rootSaga} from './sagas/rootSaga';

const sagaMiddleware = createSageMiddleWare();
const applyMiddle = process.env.NODE_ENV === 'development'?applyMiddleware(sagaMiddleware, logger):applyMiddleware(sagaMiddleware)
const store = createStore(
  reducers,
  applyMiddle
)
sagaMiddleware.run(rootSaga)
export default store;
