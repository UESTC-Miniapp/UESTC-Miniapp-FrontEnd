<template>
  <div class="summary-card">
    <div class="card-title">
      <img src="/static/book.svg" alt="" class="card-icon">
      <span>成绩总览</span>
    </div>
    <div class="card-content">
      这里应该有个图表
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
  }
}
</script>

<style lang="less">
@import '../../../style/common.less';

.summary-card {
  .card();

  .card-content {
    padding: 60px 0;
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
</style>
