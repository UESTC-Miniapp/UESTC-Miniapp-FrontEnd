<template>
  <div class="course-card">
    <div class="card-title">
      <img src="/static/book.svg" alt="" class="card-icon">
      <span>{{ title }}</span>
    </div>

    <div class="card-content">{{ content }}</div>

    <div class="card-footer">
      <div class="time">{{ time }}</div>
      <div class="address">{{ address }}</div>
      <div class="teacher">{{ teacher }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    address: String,
    teacher: String,
    time: String,
    content: String
  }
}
</script>

<style lang="less" scoped>
@import "../../../style/common.less";

.course-card {
  .card();
  margin-bottom: 10px;

  .card-content {
    padding: 20px;
    text-align: center;
    font-size: 24px;
  }
}
</style>
