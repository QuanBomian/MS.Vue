import request from '@/utils/request'

export function getList() {
  return request({
    url: '/VillagerGroups',
    method: 'get'
  })
}

export function deleteItem(id) {
  return request({
    url: '/VillagerGroups/' + id,
    method: 'delete'
  })
}

export function updateItem(item) {
  return request({
    url: '/VillagerGroups/',
    method: 'put',
    data: item
  })
}

export function createItem(item) {
  return request({
    url: '/VillagerGroups/',
    method: 'post',
    data: item
  })
}

export function query(condition) {
  return request({
    url: '/VillagerGroups/condition',
    method: 'get',
    params: condition
  })
}
