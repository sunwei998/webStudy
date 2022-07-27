import api from '@/common/request';

// ? 用户登录
// eslint-disable-next-line import/prefer-default-export
export async function userLogin(data) {
  const result = await api.post('/api/user/login', data);
  return result;
}

// ? 用户信息表格
export async function getUserInfo() {
  const result = await api.get('/api/user/users');
  return result;
}

// ? 更新积分
export async function updateUser(data) {
  await api.put('/api/user', data);
}
