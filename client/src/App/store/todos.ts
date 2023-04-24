import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, RootState } from './store';
import todoService from '../services/todos.service';
import { TTodo } from '../types/Todos';

type TTodoState = {
  entities: TTodo[];
  isLoading: boolean;
  dataError: string;
  createError: string;
};

type TCreateProps = {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  payload: { [x: string]: string };
};

const initialState: TTodoState = {
  entities: [],
  isLoading: true,
  dataError: '',
  createError: '',
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
    todoCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    createTodoRequested: (state) => {
      state.createError = '';
    },
    todoCreateFailed: (state, action) => {
      state.createError = action.payload;
    },
    todoClear: (state) => {
      state.entities = [];
    },
    todoUpdateSuccessed: (state, action) => {
      state.entities[state.entities.findIndex((doc) => doc._id === action.payload._id)] = action.payload;
    },
  },
});

const { reducer: todoReducer, actions } = todoSlice;
const {
  todoRequested,
  todoReceived,
  todoRequestFailed,
  todoClear,
  todoCreated,
  createTodoRequested,
  todoCreateFailed,
  todoUpdateSuccessed,
} = actions;

export const loadTodosList = () => async (dispatch: AppDispatch) => {
  dispatch(todoRequested());
  try {
    const data = await todoService.getTodos();
    dispatch(todoReceived(data));
  } catch (e) {
    if (axios.isAxiosError(e)) {
      dispatch(todoRequestFailed(e.message));
    }
  }
};

export const createTodo =
  (payload: TCreateProps['payload'], setActive: TCreateProps['setActive']) => async (dispatch: AppDispatch) => {
    dispatch(createTodoRequested());
    try {
      console.log(payload);
      const response = await todoService.createTodo(payload);
      dispatch(todoCreated(response.newTodo));
      setActive(false);
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        dispatch(todoCreateFailed(e.message));
      }
    }
  };

export const updateTodo =
  (payload: TCreateProps['payload'], setActive: TCreateProps['setActive']) => async (dispatch: AppDispatch) => {
    try {
      const data = await todoService.updateTodo(payload);
      dispatch(todoUpdateSuccessed(data));
      setActive(false);
    } catch (e) {}
  };

export const clearData = () => (dispatch: AppDispatch) => dispatch(todoClear());

export const getTodosLoadingStatus = () => (state: RootState) => state.todos.isLoading;
export const getTodosList = () => (state: RootState) => state.todos.entities;

export default todoReducer;
