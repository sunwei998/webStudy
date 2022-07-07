// ? 有关餐馆的请求
import request from '@/common/request';

// eslint-disable-next-line import/prefer-default-export
export async function getMenu(id) {
  const result = await request.get(`/api1/menu/restaurantId/${id}`);
  return result;
}
