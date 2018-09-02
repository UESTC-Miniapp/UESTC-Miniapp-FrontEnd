<template>
  <div class="exam-card">
    <div class="card-title">
      <img src="/static/book.svg" alt="" class="card-icon">
      <span>{{ title }}</span>
    </div>

    <div class="card-content">{{ name }}</div>

    <div class="card-footer">
      <block v-if="status">
        <div class="date">{{ date }}</div>
        <div class="time">{{ time }}</div>
        <div class="address">{{ address }}</div>
      </block>
      <block v-else>
        <div class="empty">考试情况尚未发布</div>
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
