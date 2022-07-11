import request from '@/common/request';

// eslint-disable-next-line import/prefer-default-export
export async function menuRequest(id) {
  const result = await request.get(`/api1/menu/restaurantId/${id}`);
  console.log('result: ', result);
  return result;
}
