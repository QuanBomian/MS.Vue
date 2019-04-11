import request from '@/utils/request'

export function getList() {
  return request({
    url: '/Towns',
    method: 'get'
  })
}

export function deleteItem(id) {
  return request({
    url: '/Towns/' + id,
    method: 'delete'
  })
}

export function updateItem(item) {
  return request({
    url: '/Towns/' + item.id,
    method: 'put',
    data: item
  })
}

export function createItem(item) {
  return request({
    url: '/Towns/',
    method: 'post',
    data: item
  })
}

export function query(condition) {
  return request({
    url: '/Towns/condition',
    method: 'get',
    params: condition
  })
}
