<template>
  <view class="exam-page">
    <ExamHeader title="业，精于勤"
      subtitle="Achievement is founded on diligence."/>

    <div class="content">
      <ExamCard v-for="(item, index) in exam" :key="index"
        :title="item.title" :status="item.status" :date="item.date"
        :number="item.number" :address="item.address" :name="item.course_name"
        :time="item.time"/>
      <ExamCard title="没有查询到考试信息" name="空空如也" status v-if="exam.length === 0"/>
    </div>
  </view>
</template>

<script>
import Header from '@/components/Header'
import ExamCard from './ExamCard'

import api from '@/service/api'
import db from '@/service/db'
import { errorCode2Msg } from '../../../utils/error'
import { currentSemesterID } from '../../../utils/student'

export default {
  data () {
    return {
      exam: []
    }
  },

  components: {
    ExamHeader: Header,
    ExamCard
  },

  async mounted () {
    const { token, username } = await db.get(['token', 'username'])

    const currentsid = currentSemesterID

    const types = ['期末考试', '期中考试', '补考', '缓考']

    wx.showLoading({ title: '正在拉取数据' })

    let exams = []

    let count = 0

    types.forEach(async (v, i) => {
      const res = await api.getExam({
        token, username, semesterId: currentsid, examTypeId: i + 1
      })
      count += 1
      if (res.success) {
        exams = exams.concat(res.data.map(e => {
          const reg = /\) (.*)/
          const rs = e.address.match(reg)
          return {
            ...e,
            title: e.course_id + '-' + v,
            time: rs && rs[1] ? rs[1] : '',
            address: e.number + ' ' + e.detail + '号'
          }
        }))
      } else {
        console.log(errorCode2Msg(res.error_code))
      }
      if (count === 4) {
        this.exam = exams
        console.log(exams)

        wx.hideLoading()
      }
    })
  }
}
</script>

<style lang="less" scoped>
.exam-page {
  .content {
    padding: 10px;
  }
}
</style>
