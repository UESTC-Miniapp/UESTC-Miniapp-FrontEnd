<template>
  <div class="user-page">
    <UserHeader title="" subtitle=""/>

    <div class="content">
      <div class="info-card">
        <div class="line">
          <img src="" alt="" class="avatar">
        </div>
        <div class="line user-info">
          <div class="name">张翼飞(Zhang YiFei)</div>
          <div class="number">2014000201010</div>
          <div>专业：计算机科学与技术</div>
          <div>院系：计算机科学与工程学院</div>
          <div>学籍：2016级 四年全日制学生</div>
          <div>类型：普通本科生</div>
          <div>校区：清水河校区</div>
        </div>
      </div>
      <a href="/pages/login/main" class="logout">退出登录</a>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  data () {
    return {}
  },
  components: {
    UserHeader: Header
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
@import "../../style/common.less";

.user-page {
  .content {
    padding: 0 10px;
    margin-top: -80px;

    .info-card {
      .card();
      display: flex;
      padding: 20px;

      .avatar {
        height: 100px;
        width: 80px;
        background-color: #eee;
      }

      .user-info {
        padding: 0 20px;
        font-size: 14px;
        color: #aaa;

        .name {
          color: #000;
          font-size: 18px;
        }

        .number {
          font-size: 14px;
          color: #000;
          margin-bottom: 5px;
        }
      }
    }

    .logout {
      .card();
      color: @main-color;
      margin-top: 10px;
      text-align: center;
    }
  }
}
</style>
