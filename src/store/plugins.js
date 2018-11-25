/**
 * @file: 用于打日志
 * @author: Yidadaa
 */

import createLogger from 'vuex/dist/logger'
import db from '@/service/db'

const persistencePlugin = async store => {
  // 每次更新用户信息，都要触发持久化机制
  store.subscribe(async mutation => {
    if (mutation.type === 'updateProfile') {
      await db.set(mutation.payload)
    }
  })
}

export default [
  createLogger(),
  persistencePlugin
]
