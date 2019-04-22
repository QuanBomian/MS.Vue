import request from '@/utils/request'

export function getList() {
  return request({
    url: '/Roles',
    method: 'get'
  })
}

export function deleteItem(id) {
  return request({
    url: '/Roles/' + id,
    method: 'delete'
  })
}

export function updateItem(item) {
  return request({
    url: '/Roles/',
    method: 'put',
    data: item
  })
}

export function createItem(item) {
  return request({
    url: '/Roles/',
    method: 'post',
    data: item
  })
}

export function query(condition) {
  return request({
    url: '/Roles/',
    method: 'get',
    params: condition
  })
}
