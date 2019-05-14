import request from '@/utils/request'

export function getList() {
  return request({
    url: '/Members',
    method: 'get'
  })
}

export function getPagedList(pageIndex, pageSize) {
  return request({
    url: '/Members',
    params: {
      pageIndex: pageIndex,
      pageSize: pageSize
    }
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
    url: '/Members/',
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
    url: '/Members',
    method: 'get',
    params: condition
  })
}
