<template>
<div class="login-page">
  <div class="title">
    <div class="cd">你好，</div>
    <div class="life">我的成电生活</div>
    <div class="line"></div>
    <div class="tip-text">教务 · 师生 · 图书 · 生活</div>
  </div>

  <div class="login-box card">
    <div class="login-row">
      <input type="number" class="login-input" placeholder="学号"
        placeholder-style="color: #eee" :value="username" @input="onInputChange"
        data-val="username" maxlength=13 cursor-spacing=20>
      <div class="login-input-tip" v-if="stulen !== 0">{{ stulen }}</div>
      <img class="login-input-tip icon" src="/static/ok.svg" v-else />
    </div>
    <div class="login-row">
      <input type="text" :password="!pwdVisiable" class="login-input" placeholder="信息门户密码"
        placeholder-style="color: #eee" :value="password" @input="onInputChange"
        data-val="password" :focus="pwdFocus" cursor-spacing=20 @blur="onBlur" @focus="onFocus">
      <img class="login-input-tip icon" src="/static/eye.svg" @click="hidePassword" v-if="pwdVisiable"/>
      <img class="login-input-tip icon" src="/static/close-eye.svg" @click="showPassword" v-else/>
    </div>
  </div>

  <div class="login-btn" @click="onPost">
    <span v-if="!isLoading" class="text">{{ loadingText }}</span>
    <div class="btn-loadings" v-else>
      <div class="loading-block">U</div>
      <div class="loading-block">E</div>
      <div class="loading-block">S</div>
      <div class="loading-block">T</div>
      <div class="loading-block">C</div>
    </div>
  </div>

  <div class="footer">
    <div class="circle circle-1"></div>
    <div class="circle circle-2"></div>
    <div class="circle circle-3"></div>
  </div>

  <LoginMessage />
</div>
</template>

<script>
import { errorCode2Msg } from '../../utils/error'

import store from '@store'
import mapState from '@/store/mapState'

import Message from '@/components/Message'

export default {
  components: {
    LoginMessage: Message
  },

  computed: {
    ...mapState('login'),
    stulen: () => store.getters.stulen,
    loadingText: () => store.getters.loadingText
  },

  async onLoad () {
    const { username, password } = store.getters.apiProfile()

    store.commit('changeState', { username, password })
  },

  methods: {
    async onPost () {
      console.log(this.username, this.loadingText)

      if (!this.validInput()) return

      const loginResult = await store.dispatch('login')

      if (loginResult.success) {
        wx.navigateTo({ url: '/pages/home/main' })
      } else {
        this.$children[0].show({
          content: errorCode2Msg(loginResult.error_code),
          title: '登录失败',
          duration: 3000
        })
      }
    },

    onInputChange (e) {
      const key = e.target.dataset.val
      const value = e.target.value

      store.commit('changeState', { [key]: value })
      if (key === 'username' && value.length === 13) {
        store.commit('changeState', { pwdFocus: true })
      }
    },

    onBlur () {
      store.commit('changeState', { pwdFocus: false })
    },

    onFocus () {
      store.commit('changeState', { pwdFocus: true })
    },

    showPassword () {
      store.commit('changeState', { pwdVisiable: true })
    },

    hidePassword () {
      store.commit('changeState', { pwdVisiable: false })
    },

    validInput () {
      const validators = [
        [this.username.length > 0, '请输入13位学号'],
        [this.username.length === 13, '请检查输入的学号是否有错'],
        [this.password.length > 0, '请输入信息门户密码']
      ]
      validators.some((v, i) => {
        if (!v[0]) {
          this.$children[0].show({
            content: v[1],
            title: '提示',
            duration: 3000
          })
        }
        return !v[0]
      })
      return validators.every(v => v[0])
    }
  }
}
</script>

<style scoped lang="less">
@import '../../style/common.less';

@main-color: #4DAEA4;

.login-page {
  background-color: #aaa;
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  padding: 35px;
  box-sizing: border-box;
  background: linear-gradient(to bottom, rgb(27, 149, 185), rgb(169, 217, 220));
  overflow: hidden;
}

.title {
  margin-top: 30%;
  color: #fff;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);

  .cd {
    font-size: 50px;
    line-height: 40px;
  }

  .life {
    font-size: 50px;
    font-weight: lighter;
  }

  .tip-text {
    font-size: 18px;
    font-weight: lighter;
    padding: 5px 2px;
  }

  .line {
    height: 1px;
    width: 220px;
    background-color: #fff;
    position: relative;
  }
}

.login-box {
  width: 100%;
  margin-top: 30px;
  padding: 10px 20px;
  box-sizing: border-box;

  .login-row {
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .login-input {
      width: 80%;
      font-size: 20px;
      color: @main-color;
      font-weight: lighter;
    }

    &:first-child {
      border-bottom: 1px solid #eee;
    }

    .login-input-tip {
      color: lighten(@main-color, 30%);
      min-width: 20px;
      text-align: center;
    }

    .icon {
      height: 20px;
      width: 20px;
      animation: fly 0.1s ease;
    }
  }
}

.login-btn {
  .card();
  text-align: center;
  font-size: 18px;
  margin: auto;
  margin-top: 30px;
  font-weight: bold;
  color: @main-color;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 50px;
  overflow: hidden;
  padding: 0;

  .btn-loading {
    height: 2px;
    width: 30%;
    background-color: @main-color;
    animation: loading 1s infinite ease;
    transform-origin: center;
    border-radius: 50px;
  }

  .btn-loadings {
    width: 50px;
    display: flex;
    height: 20px;
    justify-content: space-between;
    align-items: center;

    .loading-block {
      color: @main-color;
      animation: loading infinite ease 2s;
      border-radius: 5px;
      opacity: 0;

      /* 定义动画 */
      @animation-speed: .05s;
      .loop(@n) when (@n >= 0) {
        &:nth-child(@{n}) {
          animation-delay: @n * @animation-speed;
        }
        .loop(@n - 1)
      }
      .loop(5)
    }
  }

  .text {
    animation: fly ease .3s;
  }
}

.circle {
  border-radius: 45%;
  background-color: rgba(255, 255, 255, 0.5);
  animation: infinite 10s linear rotate;
  position: absolute;
}

.footer {
  position: relative;
  margin-top: 40px;

  .circle {
    height: 1000px;
    width: 1000px;
  }

  .circle-1 {
    left: -300px;
  }

  .circle-2 {
    left: -350px;
    animation-delay: 1s;
  }

  .circle-3 {
    left: -400px;
    animation-delay: 2s;
    margin-top: 10px;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes loading2 {
  from {
    transform: scaleY(1);
  }
  to {
    transform: scaleY(0.2);
  }
}

@keyframes loading {
  0% {
    transform: translateX(100px) scaleY(1.2);
    opacity: 0;
  }
  50% {
    transform: translateX(0px) scaleY(1);
    opacity: 1;
  }
  100% {
    transform: translateX(-100px) scaleY(1.2);
    opacity: 0;
  }
}

@keyframes fly {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>

