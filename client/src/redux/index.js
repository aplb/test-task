import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import saga from './saga'

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(sagaMiddleware, logger);

const store = createStore(reducer, enhancer)

sagaMiddleware.run(saga)

if (process.env.NODE_ENV === 'development') {
  window.store = store
}

export default store