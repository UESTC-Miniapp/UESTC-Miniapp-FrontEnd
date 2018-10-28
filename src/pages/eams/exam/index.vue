<template>
  <view class="exam-page">
    <ExamHeader title="业，精于勤"
      subtitle="Achievement is founded on diligence."/>

    <div class="tab">
      <Tab :tabs="tabs" @tabchange="onTabChange" :selected="showType"/>
    </div>

    <div class="content">
      <div class="loading-cards" v-if="loading">
        <FakeCard v-for="(k, i) in [1, 2, 3]" :key="i"/>
      </div>
      <NoDataCard v-else-if="nodata"/>
      <div class="exams" v-else>
        <ExamCard v-for="(item, index) in showData" :key="index"
          :title="item.title" :status="item.status" :date="item.date"
          :number="item.number" :address="item.address" :name="item.course_name"
          :time="item.time"/>
      </div>
    </div>
  </view>
</template>

<script>
import Header from '@/components/Header'
import FakeCard from '@/components/FakeCard'
import NoDataCard from '@/components/NoDataCard'
import Tab from '@/components/Tab'
import ExamCard from './ExamCard'

import api from '@/service/api'
import db from '@/service/db'
import { errorCode2Msg } from '../../../utils/error'
import { currentSemesterID } from '../../../utils/student'

const types = ['期末', '期中', '补考', '缓考']

export default {
  data () {
    return {
      exam: [],
      loading: true,
      tabs: [],
      showType: 0
    }
  },

  components: {
    ExamHeader: Header,
    ExamCard,
    FakeCard,
    NoDataCard,
    Tab
  },

  computed: {
    showData () {
      // 按类别显示考试
      if (this.showType === 0) return this.exam
      return this.exam.filter(v => v.type === this.showType)
    },
    nodata () {
      return this.showData.length === 0
    }
  },

  methods: {
    onTabChange (i) {
      this.showType = i
    }
  },

  async mounted () {
    const { token, username } = await db.get(['token', 'username'])

    const currentsid = currentSemesterID

    this.tabs = ['全部'].concat(types).map(v => ({ main: v }))

    let exams = []

    let count = 0

    this.loading = true

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
            address: e.number + ' ' + e.detail + '号',
            type: i + 1
          }
        }))
      } else {
        console.log(errorCode2Msg(res.error_code))
      }
      if (count === 4) {
        this.exam = exams
        console.log('[Exam data]', exams)

        this.loading = false
        this.nodata = exams.length === 0
      }
    })
  }
}
</script>

<style lang="less" scoped>
@import "../../../style/common.less";

.exam-page {
  .tab {
    padding: 10px;
    margin-top: -30px;
  }
  .content {
    padding: 10px;
  }
}
</style>
