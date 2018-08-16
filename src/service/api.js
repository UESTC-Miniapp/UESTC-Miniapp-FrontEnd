/**
 * @file: 所有的API都放在这里，同一import即可
 * @author: Yidadaa
 */
import config from '../config'
import { post } from '../utils/request'

const { url } = config

const funcTable = {
  login: 'login',
  checkToken: 'check_token'
}

const exportFuncs = {}

Object.entries(funcTable).map(v => {
  exportFuncs[v[0]] = params => post(`${url.root}${v[1]}.php`, params)
})

export default exportFuncs
