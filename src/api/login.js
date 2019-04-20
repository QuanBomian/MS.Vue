import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/Secret/token',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/Secret/userInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/Secret/deactivate',
    method: 'post'
  })
}

export function refresh(username, token) {
  return request({
    url: '/Secret/refresh',
    method: 'post',
    data: {
      username,
      token
    }
  })
}
export function validate(token) {
  return request({
    url: '/Secret/validate',
    method: 'get',
    params: {
      token: token
    }
  })
}
