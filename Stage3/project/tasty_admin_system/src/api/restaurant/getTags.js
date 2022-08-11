import request from '@/common/request';

// eslint-disable-next-line import/prefer-default-export
export async function getTags() {
  const result = await request.get('/api/tags');
  return result;
}
