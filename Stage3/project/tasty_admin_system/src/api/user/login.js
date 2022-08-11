import request from '@/common/request';

// ? 用户登录
// eslint-disable-next-line import/prefer-default-export
export async function userLogin(data) {
  const result = await request.post('/api/admin/login', data);
  return result;
}
