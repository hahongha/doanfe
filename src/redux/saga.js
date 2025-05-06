import RootSaga from './sagas/RootSaga';
import RootReducer from './reducers/RootReducer';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';

const initialState = {};
const sagaMiddleware = createSagaMiddleware();

const middlewares = [thunk, sagaMiddleware];

export const Store = createStore(RootReducer, initialState, compose(applyMiddleware(...middlewares)));
sagaMiddleware.run(RootSaga);
