import request from '@/utils/request'

export function getList() {
  return request({
    url: '/Menus',
    method: 'get'
  })
}

export function deleteItem(id) {
  return request({
    url: '/Menus/' + id,
    method: 'delete'
  })
}

export function updateItem(item) {
  return request({
    url: '/Menus/',
    method: 'put',
    data: item
  })
}

export function createItem(item) {
  return request({
    url: '/Menus/',
    method: 'post',
    data: item
  })
}

export function query(condition) {
  return request({
    url: '/Menus',
    method: 'get',
    params: condition
  })
}
