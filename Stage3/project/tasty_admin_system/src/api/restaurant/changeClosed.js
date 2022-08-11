import request from '@/common/request';

// eslint-disable-next-line import/prefer-default-export
export async function changeClosed(data) {
  await request.post('/api/restaurant', data);
}
