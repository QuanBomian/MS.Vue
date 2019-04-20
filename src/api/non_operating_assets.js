import request from '@/utils/request'

export function getList() {
  return request({
    url: '/NonOperatingAssetss',
    method: 'get'
  })
}

export function deleteItem(id) {
  return request({
    url: '/NonOperatingAssetss/' + id,
    method: 'delete'
  })
}

export function updateItem(item) {
  return request({
    url: '/NonOperatingAssetss/',
    method: 'put',
    data: item
  })
}

export function createItem(item) {
  return request({
    url: '/NonOperatingAssetss/',
    method: 'post',
    data: item
  })
}

export function query(condition) {
  return request({
    url: '/NonOperatingAssetss/condition',
    method: 'get',
    params: condition
  })
}
