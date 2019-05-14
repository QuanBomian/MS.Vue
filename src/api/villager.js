import request from '@/utils/request'

export function getList() {
  return request({
    url: '/Villagers',
    method: 'get'
  })
}

export function getPagedList(pageIndex, pageSize) {
  return request({
    url: '/Villagers',
    params: {
      pageIndex: pageIndex,
      pageSize: pageSize
    }
  })
}

export function deleteItem(id) {
  return request({
    url: '/Villagers/' + id,
    method: 'delete'
  })
}

export function updateItem(item) {
  return request({
    url: '/Villagers/',
    method: 'put',
    data: item
  })
}

export function createItem(item) {
  return request({
    url: '/Villagers/',
    method: 'post',
    data: item
  })
}

export function query(condition) {
  return request({
    url: '/Villagers',
    method: 'get',
    params: condition
  })
}
