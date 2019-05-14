import request from '@/utils/request'

export function getList() {
  return request({
    url: '/UserRoles',
    method: 'get'
  })
}
export function deleteItem(id) {
  return request({
    url: '/UserRoles/' + id,
    method: 'delete'
  })
}

export function updateItem(item) {
  return request({
    url: '/UserRoles/',
    method: 'put',
    data: item
  })
}

export function createItem(item) {
  return request({
    url: '/UserRoles/',
    method: 'post',
    data: item
  })
}

export function query(condition) {
  return request({
    url: '/UserRoles',
    method: 'get',
    params: condition
  })
}
