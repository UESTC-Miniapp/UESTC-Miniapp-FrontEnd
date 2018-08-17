<template>
  <view class="grade-page">
    <GradeHeader title="思而不学则殆"
      subtitle="Thought without learning is perilous."/>
    
    <view class="content">
      <SummaryCard/>
      <GradeCard title="第一学年成绩" :header="grade.header" :content="grade.content" :styles="grade.styles"/>
    </view>
  </view>
</template>

<script>
import Header from '@/components/Header'
import GradeCard from './GradeCard'
import SummaryCard from './SummaryCard'

import api from '@/service/api'
import db from '@/service/db'

const gradeStyles = new Array(5).fill({ width: '32%', align: 'l' }).map((v, i) => {
  return i >= 2 ? Object.assign({}, v, { width: '12%', align: 'c' }) : v
})

export default {
  data () {
    return {
      grade: {
        header: ['课程代码', '课程名称', '学分', '成绩', '绩点'],
        content: [
          ['C1000011', '管理与领导学', 2, 90, 4.0],
          ['C1000011', '管理与领导学', 2, 90, 4.0],
          ['C1000011', '管理与领导学', 2, 90, 4.0],
          ['C1000011', '管理与领导学', 2, 90, 4.0],
          ['C1000011', '管理与领导学', 2, 90, 4.0]
        ],
        styles: gradeStyles
      }
    }
  },
  components: {
    GradeHeader: Header,
    GradeCard,
    SummaryCard
  },
  async onLoad () {
    const { token, username } = await db.get(['token', 'username'])
    const res = await api.getGrade({ username, token, semesterId: null })
    console.log(res)
  }
}
</script>

<style lang="less" scoped>
@import '../../../style/common.less';

.grade-page {
  .content {
    padding: 0 20px;
    margin-top: -25px;
    margin-bottom: 30px;
  }
}
</style>