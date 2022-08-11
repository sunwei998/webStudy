import request from '@/common/request';

// eslint-disable-next-line import/prefer-default-export
export async function getResaurant() {
  const result = await request.get('/api/restaurant/location/-74.0059413,40.7127837');
  return result;
}
