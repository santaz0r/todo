import axios from 'axios';
import configFile from '../config.json';

const http = axios.create({
  baseURL: configFile.apiEndpoint,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

http.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${configFile.apiEndpoint}/refreshToken`, { withCredentials: true });
        localStorage.setItem('token', response.data.accessToken);
        return http.request(originalRequest);
      } catch (e) {
        console.log('UN Authorized');
      }
    }
    throw error;
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;
