import request from '@/utils/request'

export function getList() {
  return request({
    url: '/AdminDivisions',
    method: 'get'
  })
}

export function getById(id) {
  return request({
    url: '/AdminDivisions/' + id,
    method: 'get'
  })
}
export function deleteItem(id) {
  return request({
    url: '/AdminDivisions/' + id,
    method: 'delete'
  })
}

export function updateItem(item) {
  return request({
    url: '/AdminDivisions/' + item.id,
    method: 'put',
    data: item
  })
}

export function createItem(item) {
  return request({
    url: '/AdminDivisions/',
    method: 'post',
    data: item
  })
}
