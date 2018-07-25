<template>
  <div class="home-page">
    <div class="header">
      <div class="motto">
        <div class="title">UESTC</div>
        <div class="little">我的多彩成电生活</div>
      </div>
    </div>

    <div class="content">
      <div class="search-box card">
        <input type="text" placeholder="搜索图书、课程、老师" placeholder-style="color: #eee">
        <img src="/static/search.svg" alt="" class="search-icon">
      </div>
      <div class="entry-card card">
        <div class="entry-row">
          <div class="entry">
            <img src="/static/book.svg" alt="" class="icon">
            <div class="text">教务查询</div>
          </div>
          <div class="entry">
            <img src="/static/book.svg" alt="" class="icon">
            <div class="text">图书馆</div>
          </div>
          <div class="entry">
            <img src="/static/book.svg" alt="" class="icon">
            <div class="text">校车查询</div>
          </div>
          <div class="entry">
            <img src="/static/book.svg" alt="" class="icon">
            <div class="text">空闲教室</div>
          </div>
        </div>
        <div class="entry-row">
          <div class="entry">
            <img src="/static/book.svg" alt="" class="icon">
            <div class="text">校团活动</div>
          </div>
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

      <div class="card course-card">
        <div class="card-title">
          <img src="/static/book.svg" alt="" class="card-icon">
          <span>今天还有一节待出勤课程</span>
        </div>
        <div class="card-content">
          <div class="course">编译原理</div>
        </div>
        <div class="card-footer">
          <div class="time">14:00</div>
          <div class="location">品A201</div>
          <div class="teacher">爱谁谁</div>
        </div>
      </div>
      <div class="card test-card">sdfdf</div>
      <div class="card test-card">sdfdf</div>
      <div class="card test-card">sdfdf</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
@import '../../style/common.less';

.home-page {
  .header {
    background: url("http://oxwou2idi.bkt.clouddn.com/head.jpg");
    background-size: cover;
    height: 300px;
    position: relative;
    z-index: -1;

    .motto {
      color: #fff;
      text-align: center;
      position: absolute;
      bottom: 80px;
      width: 100%;

      .title {
        font-size: 60px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
      }

      .little {
        font-size: 18px;
        letter-spacing: 5px;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
      }
    }
  }

  .content {
    padding: 0 20px;
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
      margin-top: 20px;
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

    .course-card {
      padding: 10px 20px;
      margin-top: 20px;

      .card-icon {
        height: 20px;
        width: 20px;
        margin-right: 5px;
      }

      .card-title {
        font-size: 16px;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
        display: flex;
        align-items: center;
        color: #666;
      }

      .card-content {
        .course {
          font-size: 30px;
          text-align: center;
          padding: 20px;
        }
      }

      .card-footer {
        color: #666;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        border-top: 1px solid #eee;
        padding-top: 10px;
      }
    }
  }
}
</style>
