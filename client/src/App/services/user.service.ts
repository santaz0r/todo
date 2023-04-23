import { TAuthResponse } from '../types/AuthResponse';
import httpService from './http.service';
import { AxiosResponse } from 'axios';

const userService = {
  getUsers: async () => {
    const { data } = await httpService.get('/users');
    return data;
  },
};

export default userService;
