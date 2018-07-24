<template>
  <div class="main-page">
    <div class="content">
      <p class="title">已完成的页面</p>
      <a href="/pages/login/main"><button type="primary">前往登录页</button></a>
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
.main-page {
  min-height: 500px;
  padding-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  .title {
    font-size: 20px;
    color: #666;
    margin-bottom: 20px;
  }
}
</style>
