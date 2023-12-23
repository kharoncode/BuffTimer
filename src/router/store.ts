import { loginSlice } from '@/pages/login/loginSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';

const persistConfig = {
   key: 'root',
   storage,
};

const reducers = combineReducers({
   login: loginSlice.reducer,
});

const store = configureStore({
   reducer: persistReducer(persistConfig, reducers),
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

const persistor = persistStore(store, null);

export { store, persistor };
