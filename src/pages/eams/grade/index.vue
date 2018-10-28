<template>
  <div class="grade-page">
    <Message />
    <GradeHeader title="思而不学则殆"
      subtitle="Thought without learning is perilous."/>

    <div class="content">
      <SummaryCard :averGPA="summary.aver_gpa" :courseCount="summary.course_count"
        :sumPoint="summary.sum_point" :semesterSummary="semesterSummary" :loading="loading"/>
      <FakeCard v-if="loading" />
      <FakeCard v-if="loading" />
      <GradeCard :title="item.title" :header="gradeHeader" :content="item.content"
        :styles="gradeStyles" v-for="(item, index) in semesterDetail" :key="index"
        :summary="item.summary"/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Message from '@/components/Message'
import FakeCard from '@/components/FakeCard'
import GradeCard from './GradeCard'
import SummaryCard from './SummaryCard'

import api from '@/service/api'
import db from '@/service/db'
import { errorCode2Msg } from '../../../utils/error'
import { limitText } from '../../../utils/text'

const width = [25, 39, 12, 12, 12]
const align = ['l', 'l', 'c', 'c', 'c']
const gradeStyles = new Array(5).fill({ width: '32%', align: 'l' }).map((v, i) => {
  return Object.assign({}, v, { width: `${width[i]}%`, align: align[i] })
})
const gradeHeader = ['课程代码', '课程名称', '学分', '成绩', '绩点']

export default {
  data () {
    return {
      gradeStyles,
      gradeHeader,
      summary: {}, // 总览
      semesterSummary: [], // 学期总览
      semesterDetail: [], // 学期详情
      loading: true
    }
  },
  components: {
    GradeHeader: Header,
    GradeCard,
    SummaryCard,
    Message,
    FakeCard
  },
  async mounted () {
    const message = this.$children[0]
    const { token, username } = await db.get(['token', 'username'])
    this.loading = true

    this.semesterSummary = []

    const res = await api.getGrade({ username, token })

    if (res.success) {
      this.summary = res.data.summary
      const { summary, detail } = this.buildDetail(res.data, username)
      this.semesterSummary = summary
      this.semesterDetail = detail
      this.loading = false
    } else {
      message.show({
        title: '出错了',
        duration: 3000,
        content: errorCode2Msg(res.error_code)
      })
    }
  },
  methods: {
    /**
     * 生成每学期的详情数据
     */
    buildDetail (data, username) {
      const startYear = parseInt(username.slice(0, 4))
      const detail = data.detail
      const semesterSummary = data.semester_summary
      let detailGroupBySemester = {}
      // 将数据按照学期分组
      detail.forEach(v => {
        if (detailGroupBySemester[v.semester]) {
          detailGroupBySemester[v.semester].push(v)
        } else {
          detailGroupBySemester[v.semester] = [v]
        }
      })

      const semTable = ['大一', '大二', '大三', '大四']
      const termTable = ['一', '二']
      const termTable2 = ['上', '下']

      const builtDetail = semesterSummary.map(v => {
        const key = `${v.semester_year} ${v.semester_term}`
        const year = parseInt(v.semester_year.slice(0, 4))
        // 按学分倒序排列
        const detail = detailGroupBySemester[key].sort((a, b) => b.point - a.point)
        return {
          summary: v,
          key: year + v.semester_term * 0.1,
          title: `${semTable[year - startYear]}学年第${termTable[v.semester_term - 1]}学期`,
          content: detail.map(v => [v.course_code, limitText(v.course_name, 14),
            parseFloat(v.point).toFixed(1), v.final_grade, this.grade2gpa(v.final_grade).toFixed(1)])
        }
      }).sort((a, b) => b.key - a.key) // 最新的数据放在最前面

      console.log(builtDetail)

      const summary = builtDetail.map(v => {
        const year = parseInt(v.summary.semester_year.slice(0, 4))
        return {
          title: `${semTable[year - startYear]}${termTable2[v.summary.semester_term - 1]}`,
          aver_gpa: v.summary.aver_gpa.toFixed(1),
          aver_grade: v.content.reduce((last, cur) => {
            return last + cur[2] / (v.summary.sum_point + 0.0001) * cur[3]
          }, 0).toFixed(1)
        }
      }).reverse()

      console.debug('[grade builddata]', builtDetail, detailGroupBySemester)

      return {
        summary,
        detail: builtDetail
      }
    },

    /**
     * 将成绩转化为gpa
     */
    grade2gpa (grade) {
      return parseFloat((((grade > 85 ? 85 : grade < 45 ? 45 : grade) - 60) * 0.1).toFixed(1)) + parseFloat(1.5)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../style/common.less';

.grade-page {
  .content {
    padding: 0 10px;
    margin-top: -50px;
    margin-bottom: 30px;
  }
}
</style>