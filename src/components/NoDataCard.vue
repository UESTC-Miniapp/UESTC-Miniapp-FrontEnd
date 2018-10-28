<template>
  <div class="no-data-card">
    <img :src="imgsrc" class="image">
    <div class="text">
      <div class="main-text">{{ maintext }}</div>
      <div class="sub-text">{{ subtext }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgsrc: {
      type: String,
      default: '/static/nodata/no-course.png'
    },
    maintext: {
      type: String,
      default: '这里空空如也'
    },
    subtext: {
      type: String,
      default: '就像遇见妹子时你的lao壳一样'
    }
  }
}
</script>

<style lang="less" scoped>
@import "../style/common.less";

.no-data-card {
  .card();
  display: flex;
  align-items: center;
  padding: 20px;
  margin-top: 10px;

  .image {
    height: 100px;
    width: 100px;
    margin-right: 10px;
  }

  .text {
    .main-text {
      font-size: 18px;
      line-height: 2;
      font-weight: bold;
      color: #666;
    }
    .sub-text {
      font-size: 14px;
      color: #aaa;
    }
  }
}
</style>
