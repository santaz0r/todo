import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';
import todoReducer from './todos';

const rootReducer = combineReducers({
  user: userReducer,
  todos: todoReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
