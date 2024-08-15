import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const isDevToolAllowed = process.env.NODE_ENV !== 'production';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false, // Disable serializable check
    }).concat(sagaMiddleware),
  devTools: isDevToolAllowed,
});

sagaMiddleware.run(rootSaga);

export default store;