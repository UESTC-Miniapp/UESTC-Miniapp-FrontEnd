/**
 * @file: 使用小程序的数据缓存
 * @author: Yidadaa
 */

export default {
  /**
   * 从本地数据库中获取数据
   * @param {Array} keys 要获取的数据的键名
   */
  async get (keys) {
    const errorKeys = []

    keys = typeof (keys) === 'string' ? [keys] : keys

    const results = await Promise.all(keys.map(key => new Promise((resolve) => {
      wx.getStorage({
        key,
        success: res => {
          resolve({ [key]: res.data })
        },
        fail: res => {
          resolve()
          errorKeys.push(key)
        }
      })
    })))

    if (errorKeys.length > 0) {
      console.error({
        msg: '[DB.get]Cannot get those keys content',
        errorKeys
      })
    }

    let result = {}
    results.forEach(v => Object.assign(result, v))

    return result
  },

  /**
   * 更新数据到本地数据库
   * @param {Object} Obj 数据
   */
  async set (Obj) {
    const errorKeys = []

    const results = await Promise.all(Object.entries(Obj).map(v => new Promise((resolve, reject) => {
      wx.setStorage({
        key: v[0],
        data: v[1],
        fail: res => {
          resolve(false)
          errorKeys.push(v[0])
        },
        success: res => resolve(true)
      })
    })))

    if (errorKeys.length > 0) {
      console.error({
        msg: '[DB.get]Cannot set those keys content',
        errorKeys
      })
    }

    return results.every(v => v)
  },

  /**
   * 从本地缓存中清除指定键值
   * @param {Array} keys 键值数组
   */
  async remove (keys) {
    const errorKeys = []

    keys = typeof (keys) === 'string' ? [keys] : keys

    await Promise.all(keys.map(key => new Promise((resolve) => {
      wx.removeStorage({
        key,
        success: res => {
          resolve({ [key]: true })
        },
        fail: res => {
          resolve()
          errorKeys.push(key)
        }
      })
    })))

    if (errorKeys.length > 0) {
      console.error({
        msg: '[DB.get]Cannot remove those keys content',
        errorKeys
      })
    }

    return errorKeys.length > 0
  }
}
