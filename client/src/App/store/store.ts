import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';

const rootReducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
