<template>
  <div class="exam-card">
    <div class="card-title">
      <img src="/static/entry/exam.svg" alt="" class="card-icon">
      <span>{{ title }}</span>
    </div>

    <div class="card-content">{{ name }}</div>

    <div class="card-footer">
      <block v-if="status">
        <div class="date footer-block">
          <img src="/static/common/date.svg" alt="日期" class="icon">
          <span class="text">{{ date }}</span>
        </div>
        <div class="time footer-block">
          <img src="/static/common/time.svg" alt="时间" class="icon">
          <span class="text">{{ time }}</span>
        </div>
        <div class="address footer-block">
          <img src="/static/common/location.svg" alt="地址" class="icon">
          <span class="text">{{ address }}</span>
        </div>
      </block>
      <block v-else>
        <div class="empty footer-block">
          <img src="/static/common/warning.svg" alt="提示" class="icon">
          <span class="text">考试情况尚未发布</span>
        </div>
      </block>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    address: String,
    number: String,
    date: String,
    name: String,
    status: Boolean,
    time: String
  }
}
</script>

<style lang="less" scoped>
@import "../../../style/common.less";

.exam-card {
  .card();
  margin-bottom: 10px;

  .card-content {
    padding: 20px;
    text-align: center;
    font-size: 24px;
  }
}
</style>
