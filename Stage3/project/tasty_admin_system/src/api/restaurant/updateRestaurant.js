import request from '@/common/request';

// eslint-disable-next-line import/prefer-default-export
export async function updateRestaurant(data) {
  await request.post('/api/restaurant', data);
}
