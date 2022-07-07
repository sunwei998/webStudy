// ? 有关餐馆的请求
import request from '@/common/request';

// eslint-disable-next-line import/prefer-default-export
export async function getRestaurant() {
  const result = await request.get('/api1/restaurant/location/-74.0059413,40.7127837');
  return result;
}
