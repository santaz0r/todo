import httpService from './http.service';

const todoService = {
  getTodos: async () => {
    const { data } = await httpService.get('/todos');
    return data;
  },
};

export default todoService;
