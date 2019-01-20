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
            <div class="loading" v-if="loading">
              <div class="fake-text"></div>
              <div class="fake-text"></div>
            </div>
            <div v-else>
              <div class="name">{{ info.name }}({{ info.ename }})</div>
              <div class="number">{{ info.number }}</div>
            </div>
          </div>
        </div>
        <div class="info-detail">
          <div class="info-row">
            <div class="info-row-label">专业</div>
            <div class="info-row-content">
              <div class="fake-text" v-if="loading"></div>
              <div v-else>{{ info.major }}</div>
            </div>
          </div>
          <div class="info-row">
            <div class="info-row-label">院系</div>
            <div class="info-row-content">
              <div class="fake-text" v-if="loading"></div>
              <div v-else>{{ info.college }}</div>
            </div>
          </div>
          <div class="info-row">
            <div class="info-row-label">状态</div>
            <div class="info-row-content">
              <div class="fake-text" v-if="loading"></div>
              <div v-else>{{ info.status }}</div>
            </div>
          </div>
          <div class="info-row">
            <div class="info-row-label">类型</div>
            <div class="info-row-content">
              <div class="fake-text" v-if="loading"></div>
              <div v-else>{{ info.type }}</div>
            </div>
          </div>
          <div class="info-row">
            <div class="info-row-label">校区</div>
            <div class="info-row-content">
              <div class="fake-text" v-if="loading"></div>
              <div v-else>{{ info.campus }}</div>
            </div>
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
        <div class="card-row" @tap="onAdvice">
          <div class="label">反馈建议</div>
        </div>
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
      loading: true,

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
        content: '退出登录后会返回到主界面',
        success: res => {
          if (res.confirm) {
            wx.redirectTo({ url: '/pages/login/main' })
          }
        }
      })
    },
    onAdvice () {
      wx.setClipboardData({
        data: 'https://github.com/UESTC-Miniapp/UESTC-Miniapp-FrontEnd/issues',
        success (res) {
          wx.showModal({
            title: '提示',
            content: '已将在线反馈地址复制到剪贴板，请打开浏览器粘贴到地址栏后访问。'
          })
        }
      })
    }
  },
  async mounted () {
    this.loading = true
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
    this.loading = false
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
          min-width: 40%;

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
          .info-row-content {
            width: 100%;
          }
        }
      }
    }

    .setting-card {
      .card();
      margin-top: 20px;
      padding: 0;
      color: #666;

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
