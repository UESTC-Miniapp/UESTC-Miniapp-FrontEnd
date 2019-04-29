/**
 * @file: 主页的store定义
 * @author: Yidadaa
 */
import api from '@/service/api'

export default {
  namespaced: true,
  state: {
    test: 'test store'
  },
  mutations: {},
  actions: {
    async login ({ commit, state, rootGetters }) {
      const { password, username } = rootGetters.apiProfile()
      const res = await api.login({
        username: username,
        passwd: password
      })
      if (res.success) {
        commit('updateProfile', {
          username,
          password,
          token: res.token
        }, { root: true })
      }
      return res.success
    }
  },
  getters: {}
}
