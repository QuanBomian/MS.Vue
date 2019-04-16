import request from '@/utils/request'

export function getList() {
  return request({
    url: '/DataItems',
    method: 'get'
  })
}

export function deleteItem(id) {
  return request({
    url: '/DataItems/' + id,
    method: 'delete'
  })
}

export function updateItem(item) {
  return request({
    url: '/DataItems/' + item.id,
    method: 'put',
    data: item
  })
}

export function createItem(item) {
  return request({
    url: '/DataItems/',
    method: 'post',
    data: item
  })
}

export function query(condition) {
  return request({
    url: '/DataItems/condition',
    method: 'get',
    params: condition
  })
}
