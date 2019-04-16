import request from '@/utils/request'

export function getList() {
  return request({
    url: '/PartyMembers',
    method: 'get'
  })
}

export function deleteItem(id) {
  return request({
    url: '/PartyMembers/' + id,
    method: 'delete'
  })
}

export function updateItem(item) {
  return request({
    url: '/PartyMembers/' + item.id,
    method: 'put',
    data: item
  })
}

export function createItem(item) {
  return request({
    url: '/PartyMembers/',
    method: 'post',
    data: item
  })
}

export function query(condition) {
  return request({
    url: '/PartyMembers/condition',
    method: 'get',
    params: condition
  })
}
