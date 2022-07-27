import api from '@/common/request';
// ? 请求产品数据
export async function getItemInfo({ page, limit }) {
  const result = await api.get('/api/admin/shopList', {
    params: {
      page, limit,
    },
  });
  return result;
}

// ? 下架/上架shangpin
export async function deleteItem(data) {
  await api.delete('/api/admin/shopItem', { data });
}

// ? 修改商品详情
export async function modifyItem(data) {
  await api.put('/api/admin/shopItem', data);
}

// ? 添加商品详情
export async function addItem(data) {
  await api.post('/api/admin/shopItem', data);
}
