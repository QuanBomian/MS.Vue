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

// export function getInfo(token) {
//   return request({
//     url: '/Secret/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout() {
  return request({
    url: '/Secret/deactivate',
    method: 'post'
  })
}

export function refresh(username, password, token) {
  return request({
    url: '/Secret/refresh',
    method: 'post',
    data: {
      username,
      password,
      token
    }
  })
}
