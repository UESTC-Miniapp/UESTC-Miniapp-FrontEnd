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
        placeholder-style="color: #eee" :value="stunumber" @input="onInputChange"
        data-val="stunumber">
      <div class="login-input-tip" v-if="stulen !== 0">{{ stulen }}</div>
      <div class="login-input-tip" v-else>
        <div class="ok-icon">OK</div>
      </div>
    </div>
    <div class="login-row">
      <input type="number" password class="login-input" placeholder="密码"
        placeholder-style="color: #eee" :value="password" @input="onInputChange"
        data-val="password">
    </div>
  </div>

  <div class="login-btn card" @click="onPost">
    <span v-if="!isloading" class="text">即刻开启多彩成电生活</span>
    <div class="btn-loading" v-else>
    </div>
  </div>

  <div class="footer">
    <div class="circle circle-1"></div>
    <div class="circle circle-2"></div>
    <div class="circle circle-3"></div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      stunumber: '',
      password: '',
      isloading: false
    }
  },

  computed: {
    stulen () {
      return 13 - this.stunumber.length
    }
  },

  methods: {
    onPost () {
      this.isloading = true
      setTimeout(() => {
        this.isloading = false
      }, 3000)
    },

    onInputChange (e, type) {
      this[e.target.dataset.val] = e.target.value
    }
  },

  created () {
    // nothing
  }
}
</script>

<style scoped lang="less">
@main-color: #4DAEA4;
@ok-color: #4DAEA4;
@wrong-color: #FA6E79;

.login-page {
  background-color: #aaa;
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  padding: 35px;
  box-sizing: border-box;
  background: url("http://oxwou2idi.bkt.clouddn.com/head.jpg") 60% 10%;
  overflow: hidden;
}

.title {
  margin-top: 60%;
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
    }
  }
}

.card {
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}

.login-btn {
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

  .btn-loading {
    height: 2px;
    width: 30%;
    background-color: @main-color;
    animation: loading 1s infinite ease;
    transform-origin: center;
    border-radius: 50px;
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

@keyframes loading {
  0% {
    transform: translateX(100px) scaleX(1.2);
    opacity: 0;
  }
  50% {
    transform: translateX(0px) scaleX(1);
    opacity: 1;
  }
  100% {
    transform: translateX(-100px) scaleX(1.2);
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

