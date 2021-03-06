import request from '@/utils/request'

export function getList() {
  return request({
    url: '/Villages',
    method: 'get'
  })
}
export function getPagedList(pageIndex, pageSize) {
  return request({
    url: '/Villages',
    params: {
      pageIndex: pageIndex,
      pageSize: pageSize
    }
  })
}
export function deleteItem(id) {
  return request({
    url: '/Villages/' + id,
    method: 'delete'
  })
}

export function updateItem(item) {
  return request({
    url: '/Villages/',
    method: 'put',
    data: item
  })
}

export function createItem(item) {
  return request({
    url: '/Villages/',
    method: 'post',
    data: item
  })
}

export function query(condition) {
  return request({
    url: '/Villages',
    method: 'get',
    params: condition
  })
}
