/**
 * @file: 错误代码提示函数
 * @author: Yidadaa
 */

const errorCode = {
  0: '糟糕，出现了未知错误',
  101: '反正出错了，稍后重试吧',
  102: '请输入验证码',
  103: '请检查账号密码是否正确',
  104: '验证码输入错误，你真的是人类吗？',
  105: '服务器崩了，赶紧去喷开发者，让他们快去修bug',
  106: '请求出错了，代码中出了一行叛徒',
  107: '身份验证错误，我怀疑你不是你，除非你重新登录一下',
  201: '登录过期了，重新登录下吧',
  202: '我也不知道哪里出错了，快去问问开发者'
}

/**
 * 将错误代码转换为人类可阅读的文字
 * @param {Number} code 错误代码
 * @return {String} error msg
 */
export function errorCode2Msg (code = 0) {
  return errorCode[code] || errorCode[0]
}
