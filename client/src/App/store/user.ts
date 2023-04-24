import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';
import configFile from '../config.json';
import authService from '../services/auth.service';
import axios from 'axios';
import { TAuthResponse } from '../types/AuthResponse';
import { TAuthProps } from '../types/Form';
import { TFullDataUser, TUser } from '../types/User.type';
import userService from '../services/user.service';

type TUserState = {
  entities: TFullDataUser[];
  isLoading: boolean;
  error: string;
  user: TUser | null;
  isLoggedIn: boolean;
  dataLoad: boolean;
};

const initialState: TUserState = {
  entities: [],
  isLoading: false,
  error: '',
  user: null,
  isLoggedIn: false,
  dataLoad: false,
};
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequest: (state) => {
      state.dataLoad = true;
    },
    usersRequestSuccess: (state, action) => {
      state.entities = action.payload;
      state.dataLoad = false;
    },
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
    clearData: (state) => {
      state.entities = [];
    },
    authRequested: (state) => {
      state.error = '';
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer: userReducer, actions } = userSlice;
const {
  authRequestSuccess,
  userLoggedOut,
  dataLoad,
  authRequested,
  authRequestFailed,
  usersRequest,
  usersRequestSuccess,
  clearData,
} = actions;

export const loadUsersList = () => async (dispatch: AppDispatch) => {
  dispatch(usersRequest());
  try {
    const data = await userService.getUsers();
    dispatch(usersRequestSuccess(data));
  } catch (e) {
    console.log(e);
  }
};

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
export const getUsersListStatus = () => (state: RootState) => state.user.dataLoad;

export const getAuthErrors = () => (state: RootState) => state.user.error;
export const getCurrentUserData = () => (state: RootState) => state.user.user;
export const getUsersList = () => (state: RootState) => state.user.entities;
export const getManagersList = () => (state: RootState) => {
  if (state.user.entities) {
    return state.user.entities.filter((u) => u.role === 'manager');
  }
  return [];
};
export const clearUsersData = () => (dispatch: AppDispatch) => dispatch(clearData());
export const getUserById = (id: string) => (state: RootState) => {
  if (state.user.entities) {
    return state.user.entities.find((u) => u._id === id);
  }
  return null;
};

export const getUsersGroup = (managerId: string) => (state: RootState) => {
  if (state.user.entities) {
    return state.user.entities.filter((u) => u.manager === managerId);
  }
  return [];
};

export default userReducer;
