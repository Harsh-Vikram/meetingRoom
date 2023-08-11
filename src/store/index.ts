import createSagaMiddleware from '@redux-saga/core';
import {configureStore} from '@reduxjs/toolkit';
import rootReducers from '../redux/reducers';
import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducers,
  middleware: [logger] as const,
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
