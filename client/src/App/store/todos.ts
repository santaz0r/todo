import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, RootState } from './store';
import todoService from '../services/todos.service';
import { TTodo } from '../types/Todos';

type TTodoState = {
  entities: TTodo[];
  isLoading: boolean;
  dataError: string;
};

const initialState: TTodoState = {
  entities: [],
  isLoading: true,
  dataError: '',
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoRequested: (state) => {
      state.isLoading = true;
    },
    todoReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    todoRequestFailed: (state, action) => {
      state.dataError = action.payload;
      state.isLoading = false;
    },
    todoClear: (state) => {
      state.entities = [];
    },
  },
});

const { reducer: todoReducer, actions } = todoSlice;
const { todoRequested, todoReceived, todoRequestFailed, todoClear } = actions;

export const loadTodosList = () => async (dispatch: AppDispatch) => {
  dispatch(todoRequested());
  try {
    const data = await todoService.getTodos();
    dispatch(todoReceived(data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(todoRequestFailed(error.message));
    }
  }
};

export const clearData = () => (dispatch: AppDispatch) => {
  dispatch(todoClear());
};

export const getTodosLoadingStatus = () => (state: RootState) => state.todos.isLoading;
export const getTodosList = () => (state: RootState) => state.todos.entities;

export default todoReducer;
