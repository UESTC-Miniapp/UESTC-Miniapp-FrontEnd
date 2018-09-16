<template>
  <div class="user-page">
    <UserMessage />
    <UserHeader title="" subtitle=""/>

    <div class="content">
      <div class="info-card">
        <div class="info-header">
          <div class="avatar">
            <open-data type="userAvatarUrl"></open-data>
          </div>
          <div class="line user-info">
            <div class="name">{{ info.name }}({{ info.ename }})</div>
            <div class="number">{{ info.number }}</div>
          </div>
        </div>
        <div class="info-detail">
          <div class="info-row">
            <div class="info-row-label">专业</div>
            <div class="info-row-content">{{ info.major }}</div>
          </div>
          <div class="info-row">
            <div class="info-row-label">院系</div>
            <div class="info-row-content">{{ info.college }}</div>
          </div>
          <div class="info-row">
            <div class="info-row-label">状态</div>
            <div class="info-row-content">{{ info.status }}</div>
          </div>
          <div class="info-row">
            <div class="info-row-label">类型</div>
            <div class="info-row-content">{{ info.type }}</div>
          </div>
          <div class="info-row">
            <div class="info-row-label">校区</div>
            <div class="info-row-content">{{ info.campus }}</div>
          </div>
        </div>
      </div>

      <div class="setting-card">
        <label class="card-row">
          <div class="label">关联到当前微信账户</div>
          <div class="action">
            <switch class="switch" type="switch" color="#4DAEA4" @change="onLinkChange" :checked="settings.isLinked"></switch>
          </div>
        </label>
        <div class="card-row" @tap="onLogout">
          <div class="label logout">退出当前账户登录</div>
          <div class="action"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Message from '@/components/Message'
import db from '@/service/db'
import api from '../../service/api'
import { errorCode2Msg } from '../../utils/error'

export default {
  data () {
    return {
      info: {},
      avatar: null,

      settings: {
        isLinked: false
      }
    }
  },
  components: {
    UserHeader: Header,
    UserMessage: Message
  },
  methods: {
    onLinkChange (e) {
      const that = this
      if (!this.settings.isLinked) {
        wx.showModal({
          title: '确认绑定微信账户',
          content: '绑定后不必每次输入账号密码',
          success (res) {
            that.settings.isLinked = true
          },
          fail () {
            that.settings.isLinked = false
          }
        })
      } else {
        this.settings.isLinked = false
      }
    },
    onLogout () {
      wx.showModal({
        title: '确认退出登录',
        content: '退出登录后会返回到主界面'
      })
    }
  },
  async mounted () {
    wx.showLoading({ title: '正在拉取数据' })
    const { token, username } = await db.get(['token', 'username'])
    const res = await api.getUserInfo({ token, username })

    if (res.success) {
      this.info = Object.assign({}, res.data, { number: username })
    } else {
      this.$children[0].show({
        content: errorCode2Msg(res.error_code),
        title: '出错了',
        duration: 3000
      })
    }
    wx.hideLoading()
  }
}
</script>

<style lang="less" scoped>
@import "../../style/common.less";

.user-page {
  .content {
    margin-top: -80px;

    .info-card {
      .card();
      padding: 20px;

      .info-header {
        display: flex;
        align-items: flex-end;
        margin-top: -40px;

        .avatar {
          height: 80px;
          width: 80px;
          background-color: #eee;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .user-info {
          padding: 0 20px;

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

      .info-detail {
        font-size: 14px;
        color: #aaa;
        margin-top: 10px;

        .info-row {
          display: flex;
          margin-bottom: 5px;
          .info-row-label {
            min-width: 80px;
            margin-right: 20px;
            text-align: right;
          }
        }
      }
    }

    .setting-card {
      .card();
      margin-top: 20px;
      padding: 0;
      color: #aaa;

      .card-row {
        border-bottom: 1px solid #eee;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &:last-child {
          border: 0;
        }

        .logout {
          color: @main-color;
        }
      }
    }

    .switch {
      transform: scale(0.9);
      height: 0;
    }
  }
}
</style>
