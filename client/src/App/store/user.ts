import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';
import configFile from '../config.json';
import authService from '../services/auth.service';
import axios from 'axios';
import { TAuthResponse } from '../types/AuthResponse';
import { TAuthProps } from '../types/Form';

const initialState = {
  entities: null,
  isLoading: false,
  error: null,
  user: null,
  isLoggedIn: false,
};
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    authRequestSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    dataLoad: (state, action) => {
      state.isLoading = action.payload;
    },
    authRequested: (state) => {
      state.error = null;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer: userReducer, actions } = userSlice;
const { authRequestSuccess, userLoggedOut, dataLoad, authRequested, authRequestFailed } = actions;

export const login =
  ({ payload, setActive }: TAuthProps) =>
  async (dispatch: AppDispatch) => {
    dispatch(authRequested());
    const { email, password } = payload;
    try {
      const response = await authService.login({ email, password });
      localStorage.setItem('token', response.accessToken);

      dispatch(authRequestSuccess(response.user));
      setActive(false);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const message: string = e.response?.data?.message;
        dispatch(authRequestFailed(message));
      }
    }
  };

export const signUp =
  ({ payload, setActive }: TAuthProps) =>
  async (dispatch: AppDispatch) => {
    dispatch(authRequested());
    const { email, password, ...rest } = payload;
    try {
      const response = await authService.signUp({ email, password, ...rest });
      console.log(response);
      localStorage.setItem('token', response.accessToken);
      dispatch(authRequestSuccess(response.user));
      setActive(false);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const message: string = e.response?.data?.message;
        dispatch(authRequestFailed(message));
      }
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await authService.logout();
    localStorage.removeItem('token');

    dispatch(userLoggedOut());
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const message: string = e.response?.data?.message;
      // dispatch(authRequestFailed(message));
    }
    //   console.log(e.response?.data?.message);
  }
};

export const checkAuth = () => async (dispatch: AppDispatch) => {
  dispatch(dataLoad(true));
  try {
    const response = await axios.get<TAuthResponse>(`${configFile.apiEndpoint}/refreshToken`, {
      withCredentials: true,
    });
    console.log(response);
    localStorage.setItem('token', response.data.accessToken);
    dispatch(authRequestSuccess(response.data.user));
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const message: string = e.response?.data?.message;
      // dispatch(authRequestFailed(message));
    }
    //   console.log(e.response?.data?.message);
  } finally {
    dispatch(dataLoad(false));
  }
};

export const getIsLogin = () => (state: RootState) => state.user.isLoggedIn;
export const getUserLoadingStatus = () => (state: RootState) => state.user.isLoading;

export const getAuthErrors = () => (state: RootState) => state.user.error;

export default userReducer;
