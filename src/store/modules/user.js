import { login, logout, getInfo, refresh } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    expTime: 0
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_EXP: (state, expTime) => {
      state.expTime = expTime
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password)
          .then(response => {
            if (response.data.access === '无权访问') reject('账号或密码错误')
            else {
              const data = response.data
              setToken(data.access)
              commit('SET_EXP', data.profile.expires)
              commit('SET_TOKEN', data.access)

              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then(response => {
            const data = response.data
            if (data.roleNames && data.roleNames.length > 0) {
              // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', data.roleNames)
            } else {
              reject('getInfo: roles must be a non-null array !')
            }
            commit('SET_NAME', data.name)
            //  commit('SET_AVATAR', data.avatar)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    Refresh({ commit, state }) {
      return new Promise((resolve, reject) => {
        refresh(state.name, state.token)
          .then(reponse => {
            const data = reponse.data

            commit('SET_TOKEN', data.access)
            setToken(data.access)
            commit('SET_EXP', data.profile.expires)

            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
