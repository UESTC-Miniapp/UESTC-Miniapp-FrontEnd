/**
 * @file: 将store中的状态对应到组件中
 * @author: Yidadaa
 */
import store from '@store'

export default function (namespace, keys) {
  if (namespace in store.state) {
    let mappedState = {}
    const mappedKeys = !keys ? Object.keys(store.state[namespace]) : keys

    mappedKeys.forEach(v => {
      mappedState[v] = () => store.state[namespace][v]
    })

    // 映射local getters到state中
    Object.keys(store.getters).forEach(v => {
      if (v.startsWith(namespace + '/')) {
        const k = v.replace(namespace + '/', '')
        mappedState[k] = () => store.getters[v]
      }
    })

    console.debug('[mapstate]: ', namespace, mappedState)

    return mappedState
  } else {
    throw Error('Unvalid Namespace!')
  }
}
