<template>
  <div class="home-page">
    <HomeHeader title="UESTC" subtitle="我的多彩成电生活" size="large"/>

    <div class="content">
      <div class="search-box card">
        <input type="text" placeholder="搜索图书、课程、老师" placeholder-style="color: #eee">
        <img src="/static/search.svg" alt="" class="search-icon">
      </div>
      <div class="entry-card card">
        <div class="entry-row">
          <a href="/pages/eams/grade/main">
            <div class="entry">
              <img src="/static/book.svg" alt="" class="icon">
              <div class="text">成绩查询</div>
            </div>
          </a>
          <a href="/pages/eams/course/main">
            <div class="entry">
              <img src="/static/book.svg" alt="" class="icon">
              <div class="text">课程表</div>
            </div>
          </a>
          <a href="/pages/login/main">
            <div class="entry">
              <img src="/static/book.svg" alt="" class="icon">
              <div class="text">退出登录</div>
            </div>
          </a>
          <a href="/pages/eams/exam/main">
            <div class="entry">
              <img src="/static/book.svg" alt="" class="icon">
              <div class="text">考试</div>
            </div>
          </a>
        </div>
        <div class="entry-row">
          <a href="/pages/user/main">
            <div class="entry">
              <img src="/static/book.svg" alt="" class="icon">
              <div class="text">个人中心</div>
            </div>
          </a>
          <div class="entry">
            <img src="/static/book.svg" alt="" class="icon">
            <div class="text">一卡通</div>
          </div>
          <div class="entry">
            <img src="/static/book.svg" alt="" class="icon">
            <div class="text">签到服务</div>
          </div>
          <div class="entry">
            <img src="/static/book.svg" alt="" class="icon">
            <div class="text">其他</div>
          </div>
        </div>
      </div>

      <GradeCard title="成绩" :header="gradeHeader" :content="gradeContent" :styles="styles"/>
    </div>
  </div>
</template>

<script>
import db from '../../service/db'
import api from '../../service/api'

import Header from '@/components/Header'
import GradeCard from '../eams/grade/GradeCard'

export default {
  data () {
    return {
      gradeHeader: ['课程代码', '课程名称', '学分', '成绩', '绩点'],
      gradeContent: [
        ['C1000011', '管理与领导学', 2, 90, 4.0],
        ['C1000011', '管理与领导学', 2, 90, 4.0],
        ['C1000011', '管理与领导学', 2, 90, 4.0],
        ['C1000011', '管理与领导学', 2, 90, 4.0],
        ['C1000011', '管理与领导学', 2, 90, 4.0]
      ],
      styles: new Array(5).fill({ width: '32%', align: 'l' }).map((v, i) => {
        return i >= 2 ? Object.assign({}, v, { width: '12%', align: 'c' }) : v
      })
    }
  },

  components: {
    HomeHeader: Header,
    GradeCard
  },

  async onLoad () {
    const { token, username } = await db.get(['token', 'username'])

    console.debug('[Home loaded]', token, username)

    wx.showLoading({ title: '正在检查登录有效性' })

    // 首先检查是否已登录
    if (!token || !username) {
      wx.navigateTo({ url: '/pages/login/main' })
      wx.hideLoading()
    } else {
      // 然后检查登录是否过期
      const res = await api.checkToken({ token, username })
      wx.hideLoading()
      if (!res.success || !res.token_is_available) {
        // await db.remove(['token', 'username'])
        wx.navigateTo({ url: '/pages/login/main' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../style/common.less';

.home-page {
  .content {
    padding: 0 10px;
    margin-top: -25px;

    .search-box {
      padding: 15px 20px;
      color: @main-color;
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .search-icon {
        height: 18px;
        width: 18px;
      }
    }

    .entry-card {
      min-height: 100px;
      margin-top: 10px;
      padding: 20px;

      .entry-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;

        &:first-child {
          margin-top: 0;
        }
      }

      .entry {
        width: 60px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        &:active {
          background-color: #eee;
        }

        .icon {
          height: 50px;
          width: 50px;
        }
        .text {
          font-size: 14px;
          width: 100%;
          text-align: center;
          color: #666;
        }
      }
    }

    .test-card {
      margin-top: 20px;
      min-height: 200px;
      color: @main-color;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
