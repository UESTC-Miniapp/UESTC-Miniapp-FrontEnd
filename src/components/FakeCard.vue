<template>
  <div class="empty-card">
    <div class="card-title">
      <div class="fake-icon card-icon"></div>
      <div class="fake-text"></div>
    </div>

    <div class="card-content">
      <div class="fake-text"></div>
      <div class="fake-text"></div>
      <div class="fake-text"></div>
      <div class="fake-text"></div>
    </div>
  </div>
</template>

<script>
export default { }
</script>

<style lang="less" scoped>
@import "../style/common.less";

.empty-card {
  .card();
  margin-top: 10px;

  .fake-icon {
    border-radius: 100px;
    background-color: #eee;
  }

  .card-title {
    .fake-text {
      margin: 0;
    }
  }
}

@keyframes blingbling {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(200%);
  }
}
</style>
