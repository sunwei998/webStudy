// ? 有关登录的请求
import request from '@/common/request';

// eslint-disable-next-line import/prefer-default-export
export async function loginMethod({ username, password }) {
  const result = await request.post('/api2/user/login', {
    username, password,
  });
  return result;
}
