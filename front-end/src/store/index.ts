import { applyMiddleware, compose, createStore, GenericStoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import axios from './axios';
import MockAdapter from 'axios-mock-adapter';
import axiosMiddleware from 'redux-axios-middleware';
import { createBrowserHistory } from 'history';
import { rootReducer } from '@App/store/reducers';
import initSaga from '@App/store/sagas';
import { mockVisitData, mockVisitCalendarData } from '@App/tests/mocks';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: () => undefined;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (arg: GenericStoreEnhancer) => undefined;
  }
}

// There must be a better way of doing this, but for now and to get things moving
if (process.env.NODE_ENV === 'test') {    
    const mock = new MockAdapter(axios);
    mock
        .onGet('/visits')
        .reply(200, mockVisitData);
    mock
        .onGet('/visit-calendar')
        .reply(200, mockVisitCalendarData);
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
