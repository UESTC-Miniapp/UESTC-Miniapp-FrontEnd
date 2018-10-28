<template>
  <div class="course-page">
    <Message />
    <CourseHeader title="学而不思则惘"
      subtitle="Learning without thought is labor lost."/>

    <div class="content">
      <div class="selector">
        <div class="selector-block" :class="[index === currentIndex ? 'today' : '']"
          v-for="(item, index) in courses" :key="index" @tap="onTap(index)">
          <div class="selector-text">{{ item.text }}</div>
          <div class="selector-count">
            <img src="/static/loading-white.svg" alt="" v-if="loading" class="loading-icon">
            <div v-else>{{ item.count }}</div>
          </div>
        </div>
      </div>
      <div class="course-container">
        <CourseCard v-for="(item, index) in currentCourses" :key="index"
          :title="item.time" :content="item.courseName" :time="item.date"
          :teacher="item.teacher" :address="item.room"/>
        <FakeCard v-if="loading" v-for="(k, i) in [1, 2, 3]" :key="i"/>
        <NoDataCard v-if="currentCourses.length === 0 && !loading"/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Message from '@/components/Message'
import FakeCard from '@/components/FakeCard'
import NoDataCard from '@/components/NoDataCard'
import CourseCard from './CourseCard'

import api from '@/service/api'
import db from '@/service/db'
import { errorCode2Msg } from '../../../utils/error'

const textTable = ['MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT', 'SUN']
const colors = ['rgb(245, 166, 3)', 'rgb(254, 218, 10)', 'rgb(147, 108, 223)', 'rgb(6, 171, 105)', 'rgb(191, 203, 9)', 'rgb(254, 87, 133)', 'rgb(251, 96, 8)']
const dateTable = ['一', '二', '三', '四', '五', '六', '日']
const coursesTemplate = () => new Array(7).fill(0).map((v, i) => {
  return {
    list: [],
    count: 0,
    text: textTable[i]
  }
})

export default {
  data () {
    return {
      loading: true,
      courses: coursesTemplate(), // 周一到周五的课表
      currentIndex: -1 // 当前选中的课表
    }
  },
  components: {
    CourseHeader: Header,
    Message,
    CourseCard,
    FakeCard,
    NoDataCard
  },
  computed: {
    currentCourses () {
      return (this.courses[this.currentIndex] || {}).list || []
    },
    containerColor () {
      return `background: linear-gradient(to bottom, ${colors[this.currentIndex] || colors[0]}, #fff)`
    }
  },
  methods: {
    onTap (index) {
      this.currentIndex = index
    }
  },
  async mounted () {
    const { token, username } = await db.get(['token', 'username'])
    const message = this.$children[0]

    this.loading = true

    const res = await api.getCourseTable({ token, username, semesterId: '' })
    this.loading = false
    let courses = coursesTemplate()
    if (res.success) {
      res.data.forEach(v => {
        const s = parseInt(v.time[0][1])
        const text = s < 4 ? '上午' : s < 8 ? '下午' : '晚上'
        const st = Math.min(...v.time.map(x => parseFloat(x[1])))
        const ed = Math.max(...v.time.map(x => parseFloat(x[1])))
        const start = st < 2 ? '08:30' : st < 4 ? '10:20' : st < 6 ? '14:30' : st < 8 ? '16:20' : '19:30'
        const end = ed < 2 ? '10:05' : ed < 4 ? '11:55' : ed < 6 ? '16:05' : ed < 8 ? '17:55' : '21:55'
        if (v.time && v.time[0]) {
          courses[v.time[0][0]].list.push(Object.assign({}, v, {
            time: `周${dateTable[v.time[0][0]]}${text} ${start} 到 ${end}`,
            key: v.time[0][1] // 使用第一节课的索引作为排序依据
          }))
        }
      })
      console.log('[Course Loaded]', courses)
      // 将课程按照时间进行排列
      courses = courses.map(v => Object.assign({}, v, { list: v.list.sort((a, b) => a.key - b.key) }))
      this.courses = courses.map(v => Object.assign({}, v, { count: v.list.length }))
      this.currentIndex = (new Date().getDay() + 6) % 7 // 选中今天的课表
    } else {
      message.show({
        title: '出错了',
        duration: 3000,
        content: errorCode2Msg(res.error_code)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@colors: rgb(245, 166, 3), rgb(254, 218, 10), rgb(147, 108, 223), rgb(6, 171, 105), rgb(191, 203, 9), rgb(254, 87, 133), rgb(251, 96, 8);
@end-colors: rgb(250, 209, 121), rgb(250, 230, 130), rgb(150, 168,216), rgb(133, 233, 179), rgb(220, 230, 120), rgb(252, 168, 190), rgb(237, 168, 130);

.course-page {
  .content {
    margin-top: -80px;
    margin-bottom: 20px;
    .selector {
      display: flex;
      justify-content: space-around;

      .today {
        transform: translateY(-20px);
      }

      .selector-block {
        text-align: center;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        min-width: 50px;
        max-width: 50px;
        color: #fff;
        height: 80px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        padding-bottom: 20px;
        transition: transform .3s ease;

        .loop(@i) when (@i > 0) {
          &:nth-child(@{i}) {
            background: linear-gradient(to bottom, extract(@colors, @i), extract(@end-colors, @i));
          }
          .loop(@i - 1);
        }

        .loop(length(@colors));

        .selector-text {
          font-size: 14px;
          margin-top: 10px;
        }
        .selector-count {
          margin-top: 10px;
          font-size: 20px;
          display: flex;
          justify-content: center;

          .loading-icon {
            height: 20px;
            width: 20px;
          }
        }
      }
    }

    .course-container {
      padding: 10px;
      background-color: #fff;
      min-height: 200px;
      background:#fff;
      padding-top: 20px;
      margin-top: -20px;
      transform: scale(1);
    }
  }
}
</style>
