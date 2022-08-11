import request from '@/common/request';

// eslint-disable-next-line import/prefer-default-export
export async function updateAva(data) {
  await request.post('/api/food', data);
}
