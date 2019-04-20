import request from '@/utils/request'

export function getList() {
  return request({
    url: '/Familys',
    method: 'get'
  })
}

export function deleteItem(id) {
  return request({
    url: '/Familys/' + id,
    method: 'delete'
  })
}

export function updateItem(item) {
  return request({
    url: '/Familys/',
    method: 'put',
    data: item
  })
}

export function createItem(item) {
  return request({
    url: '/Familys/',
    method: 'post',
    data: item
  })
}

export function query(condition) {
  return request({
    url: '/Familys/condition',
    method: 'get',
    params: condition
  })
}
