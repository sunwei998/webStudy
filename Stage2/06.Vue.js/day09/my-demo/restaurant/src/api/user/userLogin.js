import request from '@/common/request';

// eslint-disable-next-line import/prefer-default-export
export async function userLogin(data) {
  const result = await request.post('/api2/user/login', data);
  return result;
}
