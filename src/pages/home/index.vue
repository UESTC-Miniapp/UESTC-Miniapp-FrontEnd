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
              <img src="/static/entry/grade.svg" alt="" class="icon">
              <div class="text">成绩查询</div>
            </div>
          </a>
          <a href="/pages/eams/course/main">
            <div class="entry">
              <img src="/static/entry/course.svg" alt="" class="icon">
              <div class="text">课程表</div>
            </div>
          </a>
          <a href="/pages/eams/exam/main">
            <div class="entry">
              <img src="/static/entry/exam.svg" alt="" class="icon">
              <div class="text">考试</div>
            </div>
          </a>
          <a href="/pages/ecard/main">
            <div class="entry">
              <img src="/static/entry/ecard.svg" alt="" class="icon">
              <div class="text">一卡通</div>
            </div>
          </a>
        </div>
        <div class="entry-row">
          <a href="/pages/user/main">
            <div class="entry">
              <img src="/static/entry/user.svg" alt="" class="icon">
              <div class="text">个人中心</div>
            </div>
          </a>
          <div class="entry">
            <img src="/static/entry/come.svg" alt="" class="icon">
            <div class="text">签到服务</div>
          </div>
          <div class="entry">
            <img src="/static/entry/other.svg" alt="" class="icon">
            <div class="text">其他</div>
          </div>
          <a href="/pages/login/main" open-type="redirect">
            <div class="entry">
              <img src="/static/entry/logout.svg" alt="" class="icon">
              <div class="text">退出登录</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@store'

import Header from '@/components/Header'
import FakeCard from '@/components/FakeCard'
import NoDataCard from '@/components/NoDataCard'

export default {
  components: {
    HomeHeader: Header,
    FakeCard,
    NoDataCard
  },

  computed: {
    test: () => store.state.home.test
  },

  async onLoad () {
    // 登录时判断token是否可用
    if (!(await store.dispatch('checkTokenAvailable'))) {
      wx.navigateTo({ url: '/pages/login/main' })
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
    padding-bottom: 10px;

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
          color: #aaa;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
