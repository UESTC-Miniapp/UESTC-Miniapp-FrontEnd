/**
 * @file: 用来存放一些多处用到的数据
 * @author: Yidadaa
 */

const START_YEAR = 2014
const sid = 43 // 2014第一学期是43，之后每学年都会递增20
const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth()

const term = currentMonth < 8 && currentMonth > 2 ? 1 : 0

const offset = currentMonth < 2 ? 1 : 0 // 针对寒假月份的偏移处理

export const currentSemesterID = ((currentYear - START_YEAR - offset) * 2 - term) * 20 + sid
