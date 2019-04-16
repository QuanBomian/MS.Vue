import request from '@/utils/request'

export function getListOfDataItem() {
  return request({
    url: '/DataItems',
    method: 'get'
  })
}

export function getByIdOfDataItem(id) {
  return request({
    url: '/DataItems/' + id,
    method: 'get'
  })
}
export function deleteItemOfDataItem(id) {
  return request({
    url: '/DataItems/' + id,
    method: 'delete'
  })
}

export function updateItemOfDataItem(item) {
  return request({
    url: '/DataItems/' + item.id,
    method: 'put',
    data: item
  })
}

export function createItemOfDataItem(item) {
  return request({
    url: '/DataItems/',
    method: 'post',
    data: item
  })
}

export function getListsByCategroyId(id) {
  return request({
    url: '/DataItems/condition',
    method: 'get',
    params: {
      categroyCode: id
    }
  })
}
