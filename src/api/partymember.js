import request from '@/utils/request'

export function getList() {
  return request({
    url: '/PartyMembers',
    method: 'get'
  })
}
export function getPagedList(pageIndex, pageSize) {
  return request({
    url: '/PartyMembers',
    params: {
      pageIndex: pageIndex,
      pageSize: pageSize
    }
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
    url: '/PartyMembers/',
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
    url: '/PartyMembers',
    method: 'get',
    params: condition
  })
}
