<template>
  <div class="summary-card">
    <div class="card-title">
      <img src="/static/book.svg" alt="" class="card-icon">
      <span>成绩总览</span>
    </div>
    <div class="card-content">
      <view class="row" v-for="(v, index) in semesterSummary" :key="index"
        @tap="showInfo(v.title, v.aver_gpa, v.aver_grade)">
        <view class="title">{{ v.title}}</view>
        <view class="bar-chart">
          <view class="bar" :style="'width:' + v.aver_gpa / 4 * 100 + '%'"></view>
          <view class="bar" :style="'width:' + v.aver_grade + '%'"></view>
        </view>
      </view>
    </div>
    <div class="card-footer">
      <div class="footer-block">
        <div class="title">综合GPA</div>
        <div class="content">{{ averGPA }}</div>
      </div>
      <div class="footer-block">
        <div class="title">已修科目</div>
        <div class="content">{{ courseCount }}</div>
      </div>
      <div class="footer-block">
        <div class="title">已修学分</div>
        <div class="content">{{ sumPoint }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    averGPA: Number,
    courseCount: Number,
    sumPoint: Number,
    semesterSummary: Array
  },

  methods: {
    showInfo (title, gpa, grade) {
      wx.showToast({ title: `${title}成绩总览\n绩点：${gpa}，成绩：${grade}`, icon: 'none' })
    }
  }
}
</script>

<style lang="less">
@import '../../../style/common.less';

.summary-card {
  .card();

  .card-content {
    padding: 10px 0;
    .row {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 4px;

      &:active {
        background-color: #eee;
      }

      &.last-child {
        padding-bottom: 0;
      }

      .title {
        width: 18%;
        font-size: 14px;
        color: #aaa;
      }
      .bar-chart {
        width: 80%;

        .bar {
          height: 5px;
          border-radius: 10px;
          background: linear-gradient(to left, @main-color, #fff);
          background: @main-color;
          margin: 3px 0;
          animation: barIn .3s ease;
          transform-origin: left center;
          opacity: 0.6;
        }

        .bar:nth-child(2) {
          background: linear-gradient(to left, @sec-color, #fff);
          background: @sec-color;
        }
      }
    }
  }

  .card-footer {
    .footer-block {
      .title {
        font-size: 12px;
      }
      .content {
        font-size: 24px;
      }
    }
  }
}

@keyframes barIn {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
</style>
