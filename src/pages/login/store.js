/**
 * @file: 登录界面的store
 * @author: Yidadaa
 */
import api from '@/service/api'

export default {
  state: {
    username: '',
    password: '',

    isLoading: false,
    pwdVisiable: false,
    pwdFocus: false,

    loadingStatus: 0 // 0: 未尝试 1: 登录成功 2: 登录失败
  },
  mutations: {
    /**
     * 是否在加载/密码可见/密码框获取焦点
     * @param {Object} state 全局状态
     * @param {Boolean} payload 新的状态
     */
    changeState (state, payload) {
      for (let key in payload) {
        state[key] = payload[key]
      }
    }
  },
  actions: {
    /**
     * 尝试登录
     */
    async login ({ commit, state }) {
      commit('changeState', { isLoading: true })

      const { username, password } = state

      const res = await api.login({
        username,
        passwd: password
      })

      const { token } = res

      commit('changeState', { isLoading: false })

      if (res.success) {
        commit('changeState', { loadingStatus: 1 })
        commit('updateProfile', {
          username,
          password,
          token
        })
      } else {
        commit('changeState', { loadingStatus: 2 })
      }

      return res
    }
  },
  getters: {
    stulen (state) {
      return 13 - (state.username || '').length
    },
    loadingText (state) {
      return ['即刻开启多彩成电生活', '登录成功', '登录失败'][state.loadingStatus]
    }
  }
}
