import request from '@/utils/request'

export function getList() {
  return request({
    url: '/Users',
    method: 'get'
  })
}
export function get(id) {
  return request({
    url: '/Users/' + id,
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
    url: '/Users/',
    method: 'put',
    data: item
  })
}
export function resetPassword(user) {
  return request({
    url: '/Users/Reset',
    method: 'put',
    data: user
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
    url: '/Users',
    method: 'get',
    params: condition
  })
}
