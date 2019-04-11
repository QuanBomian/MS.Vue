import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/Users/login',
    method: 'get',
    params: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/Users/info',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/Users/logout',
    method: 'post',
    params: { token }
  })
}
