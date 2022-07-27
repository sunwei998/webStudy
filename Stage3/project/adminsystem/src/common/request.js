// ? 自己封装的axios
import { create } from 'axios';
import _ from 'lodash';
import { get } from '@/common/util';
import CustomError from '@/common/error';
import store from '@/store';
import { Message } from 'element-ui';

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
    // ? 从localstorage中获取token
    const user = get('user');
    const token = _.get(user, 'token', null);
    if (token) {
    // eslint-disable-next-line no-param-reassign
      request.headers.authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => Promise.reject(error),
);

// ? 响应的拦截器
// ? 响应之后，对响应的统一处理
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // ? 统一处理错误
    const e = new CustomError(error);
    if (e.code === 'auth-failed') {
      store.dispatch('logout');
      Message.error('请重新登陆');
    }
    return Promise.reject(e);
  },
);

export default api;
