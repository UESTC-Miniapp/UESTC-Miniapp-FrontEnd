/**
 * @file: 所有的API都放在这里，同一import即可
 * @author: Yidadaa
 */
import config from './config'
import { post } from '../utils/request'

const { url } = config

export default {
  async login (params) {
    console.log(url, params)
    const res = await post(`${url.root}login.php`, params)
    return res
  }
}
