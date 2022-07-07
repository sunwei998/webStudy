// ? 自己封装的axios
import { create } from 'axios';

// ? 创建一个axios
const api = create({
  // ? 基本配置
  // ? axios.get('/user/login')
  // ? http://localhost:3000/user/login
  // baseURL: 'http://49.235.98.65:8889',
  // ? 过期时间
  timeout: 5000,
});

// ? 拦截器
// ? axios提供一个功能
// ! 在发送请求之前，可以对请求做一些操作
// ! 在收到响应后，可以对响应做一些操作

// ? 请求的拦截器
// ? 请求发送出去之前，统一的一个操作
api.interceptors.request.use(
  (request) => {
    // ? 请求头上设置一个属性
    // eslint-disable-next-line no-param-reassign
    request.headers.a = 'aaaaa';
    return request;
  },
  (error) => Promise.reject(error),
);

// ? 响应的拦截器
// ? 响应之后，对响应的统一处理
api.interceptors.response.use((response) => response.data, (error) => Promise.reject(error));

export default api;
