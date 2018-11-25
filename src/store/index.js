import Vue from 'vue'
import Vuex from 'vuex'

// store插件
import plugins from './plugins'

// 所有的api都在这里引入
import api from '@/service/api'
import db from '@/service/db'

// 收集各页面的store
import home from '@/pages/home/store'
import login from '@/pages/login/store'

Vue.use(Vuex)

const isDebugMode = process.env.NODE_ENV !== 'production'

// store初始化时，从本地数据库读取数据
const { username, password, token } = db.getSync(['username', 'password', 'token'])

// 公有状态，用于存储用户的登陆态等等
const commonStore = {
  state: {
    username,
    password,
    token
  },
  mutations: {
    updateProfile (state, payload) {
      state.username = payload.username
      state.password = payload.password
      state.token = payload.token
    }
  },
  getters: {
    apiProfile: state => () => {
      return {
        username: state.username,
        token: state.token
      }
    }
  },
  actions: {
    /**
     * 判断token是否可用
     * @param {Object} param
     */
    async checkTokenAvailable ({ commit, state }) {
      console.log(state)
      let isAvailable = state.username && state.password
      console.log(isAvailable)
      if (isAvailable) {
        const { success } = await api.checkToken()
        isAvailable = isAvailable || success
      }
      return isAvailable
    }
  }
}

export default new Vuex.Store({
  modules: {
    common: commonStore,
    home,
    login
  },
  strict: isDebugMode,
  plugins
})
