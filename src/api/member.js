import request from '@/utils/request'

export function getList() {
  return request({
    url: '/Members',
    method: 'get'
  })
}

export function deleteItem(id) {
  return request({
    url: '/Members/' + id,
    method: 'delete'
  })
}

export function updateItem(item) {
  return request({
    url: '/Members/' + item.id,
    method: 'put',
    data: item
  })
}

export function createItem(item) {
  return request({
    url: '/Members/',
    method: 'post',
    data: item
  })
}

export function query(condition) {
  return request({
    url: '/Members/condition',
    method: 'get',
    params: condition
  })
}
