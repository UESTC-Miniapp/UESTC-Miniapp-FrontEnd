<template>
  <div class="header">
    <div :class="[size === 'large' ? 'large-motto' : 'motto']">
      <div class="title">{{ title }}</div>
      <div class="little">{{ subtitle }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String,
    size: String
  }
}
</script>

<style lang="less">
.header {
  background: url(https://img-1252677023.cos.ap-chengdu.myqcloud.com/galaxy_dribbble.gif?q-sign-algorithm=sha1&q-ak=AKID8nEiz6iQFyFnsxiPW8qWuSHncijIoU6G&q-sign-time=1543824727;1543826527&q-key-time=1543824727;1543826527&q-header-list=&q-url-param-list=&q-signature=552e1293ea873352981a1f606f08807f59df1f15&x-cos-security-token=a6cdc98393ffaf45c9a708032e83cb641eb8224b10001);
  background-size: cover;
  height: 300px;
  position: relative;
  z-index: -1;

  .motto {
    color: #fff;
    text-align: center;
    position: absolute;
    bottom: 120px;
    width: 100%;

    .title {
      font-size: 40px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    }

    .little {
      font-size: 14px;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    }
  }

  .large-motto {
    .motto();

    .title {
      font-size: 60px!important;
    }
    .little {
      font-size: 18px;
      letter-spacing: 5px;
    }
  }
}
</style>