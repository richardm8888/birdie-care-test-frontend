import { applyMiddleware, compose, createStore, GenericStoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import createBrowserHistory from 'history/createBrowserHistory';
import { rootReducer } from '@App/store/reducers';
import initSaga from '@App/store/sagas';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: () => undefined;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (arg: GenericStoreEnhancer) => undefined;
  }
}

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000',
    responseType: 'json'
});

const sagaMiddleware = createSagaMiddleware();
const axiosMiddlewareInstance = axiosMiddleware(axiosClient);
export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware, axiosMiddlewareInstance)),
);

sagaMiddleware.run(initSaga);

export default store;
