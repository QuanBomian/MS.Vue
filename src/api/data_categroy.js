import request from '@/utils/request'

export function getListOfDataCategroy() {
  return request({
    url: '/DataCategroys',
    method: 'get'
  })
}

export function deleteItemOfDataCategroy(id) {
  return request({
    url: '/DataCategroys/' + id,
    method: 'delete'
  })
}

export function updateItemOfDataCategroy(item) {
  return request({
    url: '/DataCategroys/' + item.id,
    method: 'put',
    data: item
  })
}

export function createItemOfDataCategroy(item) {
  return request({
    url: '/DataCategroys/',
    method: 'post',
    data: item
  })
}
