import httpService from './http.service';

const userService = {
  getUsers: async () => {
    const { data } = await httpService.get('/users');
    return data;
  },
};

export default userService;
