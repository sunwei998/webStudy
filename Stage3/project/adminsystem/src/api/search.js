import api from '@/common/request';

// ? 联想查询,根据名字查询
export async function searchContent({ keyword }) {
  const result = await api.get('/api/search/content', {
    params: {
      keyword,
    },
  });
  return result;
}

// ? 通过id获取商品信息
export async function getShopItem(id) {
  const result = await api.get('/api/admin/shopItem', {
    params: {
      id,
    },
  });
  return result;
}
