import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['sessionStoreSlice'], // persist reducer with Login and Regsiter Flow
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const isDevToolAllowed = process.env.NODE_ENV !== 'production';

const store = configureStore({
  // reducer: rootReducer,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false, // Disable serializable check
    }).concat(sagaMiddleware),
  devTools: isDevToolAllowed,
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };