/**
 * @file: 所有的API都放在这里，同一import即可
 * @author: Yidadaa
 */
import { root } from './config'
import axios from 'axios'

export default {
  async login (params) {
    const res = await axios.post(`${root}login.php`, params)
    return res
  }
}
