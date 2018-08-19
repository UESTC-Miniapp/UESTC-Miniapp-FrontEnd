/**
 * @file: 处理文字的工具函数
 * @author: Yidadaa
 */
/**
* 将字符串超长部分置为...
* @param {String} text 字符串
* @param {Number} len 限制字数长度
* @param {String} end 收尾字符，默认为...
*/
export function limitText (text, len, end = '...') {
  text = text || ''
  let rtnVal = ''
  let count = 0
  const totalLen = text.replace(/[^\x00-\xff]/g, '..').length
  for (let i = 0; i < text.length && count < len; i++) {
    const s = text[i]
    const isCH = s.replace(/[^\x00-\xff]/g, '') === ''
    count += isCH ? 2 : 1 // 一个汉字等于两个英文
    rtnVal += s
  }
  return rtnVal + (totalLen > len ? end : ' ')
}
