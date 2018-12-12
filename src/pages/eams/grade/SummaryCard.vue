<template>
  <div class="summary-card">
    <div class="card-title">
      <img src="/static/entry/grade.svg" alt="" class="card-icon">
      <span>成绩总览</span>
    </div>
    <div class="card-content">
      <div class="loading-block" v-if="loading">
        <img class="loading-icon" src="/static/loading.svg" />
      </div>
      <div v-else>
        <div class="row" v-for="(v, index) in semesterSummary" :key="index"
          @tap="showInfo(v.title, v.aver_gpa, v.aver_grade)">
          <div class="title">{{ v.title}}</div>
          <div class="bar-chart">
            <div class="bar" :style="'width:' + v.aver_gpa / 4 * 100 + '%'"></div>
            <div class="bar" :style="'width:' + v.aver_grade + '%'"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="footer-block">
        <div class="title">综合GPA</div>
        <div class="fake-text" v-if="loading"></div>
        <div class="content" v-else>{{ averGPA }}</div>
      </div>
      <div class="footer-block">
        <div class="title">已修科目</div>
        <div class="fake-text" v-if="loading"></div>
        <div class="content" v-else>{{ courseCount }}</div>
      </div>
      <div class="footer-block">
        <div class="title">已修学分</div>
        <div class="fake-text" v-if="loading"></div>
        <div class="content" v-else>{{ sumPoint }}</div>
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
    semesterSummary: Array,
    loading: Boolean
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

    .loading-block {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 70px;

      .loading-icon {
        height: 25px;
        width: 25px;
      }
    }

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
      display: block;
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
