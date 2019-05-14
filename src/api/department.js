import request from '@/utils/request'

export function getList() {
  return request({
    url: '/Departments',
    method: 'get'
  })
}
export function getPagedList(pageIndex, pageSize) {
  return request({
    url: '/Departments',
    params: {
      pageIndex: pageIndex,
      pageSize: pageSize
    }
  })
}

export function deleteItem(id) {
  return request({
    url: '/Departments/' + id,
    method: 'delete'
  })
}

export function updateItem(item) {
  return request({
    url: '/Departments/',
    method: 'put',
    data: item
  })
}

export function createItem(item) {
  return request({
    url: '/Departments/',
    method: 'post',
    data: item
  })
}

export function query(condition) {
  return request({
    url: '/Departments',
    method: 'get',
    params: condition
  })
}
