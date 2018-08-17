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
        <div class="content">3.30</div>
      </div>
      <div class="footer-block">
        <div class="title">平均成绩</div>
        <div class="content">83.30</div>
      </div>
      <div class="footer-block">
        <div class="title">已修学分</div>
        <div class="content">103.5</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {}
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
