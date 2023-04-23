import { TAuthResponse } from '../types/AuthResponse';
import httpService from './http.service';
import { AxiosResponse } from 'axios';

const authService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const { data }: AxiosResponse<TAuthResponse> = await httpService.post('/login', {
      email,
      password,
    });
    return data;
  },
  signUp: async (payload: { email: string; password: string }) => {
    const { data } = await httpService.post('/signup', payload);
    return data;
  },
  logout: async () => await httpService.post('/logout'),
};

export default authService;
