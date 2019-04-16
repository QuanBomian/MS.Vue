import request from '@/utils/request'

export function getList() {
  return request({
    url: '/Users',
    method: 'get'
  })
}

export function deleteItem(id) {
  return request({
    url: '/Users/' + id,
    method: 'delete'
  })
}

export function updateItem(item) {
  return request({
    url: '/Users/' + item.id,
    method: 'put',
    data: item
  })
}

export function createItem(item) {
  return request({
    url: '/Users/',
    method: 'post',
    data: item
  })
}

export function query(condition) {
  return request({
    url: '/Users/condition',
    method: 'get',
    params: condition
  })
}
