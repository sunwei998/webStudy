import request from '@/common/request';

// eslint-disable-next-line import/prefer-default-export
export async function menuRequest({
  id, page, limit, keyword,
}) {
  const result = await request.get(`/api/food?restaurantId=${id}&page=${page}&limit=${limit}&keyword=${keyword}`);
  console.log('result: ', result);
  return result;
}
