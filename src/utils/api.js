import axios from 'axios';

const axiosBase = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
  responseType: 'json'
});
const api = {
  post: (url, data, config) => axiosBase.post(url, data, config),
  get: (url, config) => axiosBase.get(url, config)
};
export default api;
