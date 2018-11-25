/**
 * @file: 所有的API都放在这里，同一import即可
 * @author: Yidadaa
 */
import config from '../config'
import { post } from '@utils/request'
import store from '@store'

const { url } = config

const funcTable = {
  login: 'login',
  checkToken: 'check_token',
  getGrade: 'grade',
  getCourseTable: 'timetable',
  getExam: 'exam',
  getUserInfo: 'person',
  getEcardInfo: 'ecard/info',
  getEcardStat: 'ecard/stat',
  getEcardHistory: 'ecard/history'
}

const exportFuncs = {}

Object.entries(funcTable).map(v => {
  exportFuncs[v[0]] = params => {
    // 在每个请求中注入用户请求
    const profile = store.getters.apiProfile()
    if (v[0] !== 'login') {
      // 登录请求除外
      params = Object.assign({}, params, profile)
    }
    return post(`${url.root}${v[1]}.php`, params)
  }
})

export default exportFuncs
