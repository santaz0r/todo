import httpService from './http.service';

const todoEndPoint = '/todos';

const todoService = {
  getTodos: async () => {
    const { data } = await httpService.get(todoEndPoint);
    return data;
  },
  createTodo: async (payload: { [x: string]: string }) => {
    const { data } = await httpService.post(todoEndPoint, payload);
    return data;
  },
};

export default todoService;
