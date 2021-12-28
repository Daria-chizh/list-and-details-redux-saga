import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import saga from '../sagas';
import serviceListReducer from '../reducers/services';
import fetcherReducer from '../reducers/fetcher';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ serviceList: serviceListReducer, fetcher: fetcherReducer }),
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(saga);

export default store;















