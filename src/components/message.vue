<template>
  <view class="message-container" v-if="visiable">
    <view class="message-mask" @tap="hideMessage"></view>
    <view class="message" :class="mclass">
      <view class="title">{{ title }}</view>
      <view class="content">{{ content }}</view>
    </view>
  </view>
</template>

<script>
let timeout = null

export default {
  data () {
    return {
      mclass: 'message-show',
      title: '',
      content: '',
      visiable: false
    }
  },

  methods: {
    hideMessage () {
      clearTimeout(timeout)
      this.mclass = 'message-hide'
      setTimeout(() => {
        this.visiable = false
        this.mclass = 'message-show'
      }, 300)
    },

    show (options) {
      this.title = options.title
      this.content = options.content
      if (options.duration) {
        timeout = setTimeout(() => {
          this.hideMessage()
        }, options.duration)
      }
      this.visiable = true
    },

    hide () {
      this.hideMessage()
      this.title = ''
      this.content = ''
    }
  }
}
</script>

<style lang="less" scoped>
.message-container {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;

  .message-mask {
    // background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }

  .message {
    background-color: #fff;
    padding: 20px;
    padding-top: 50px;
    border-radius: 0 0 20px 20px;
    z-index: 999;
    transition: ease .3s transform;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);

    .title {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .content {
      font-size: 16px;
      color: #aaa;
    }
  }
}

.message-show {
  transform: translateY(0);
  animation: flyin .3s ease;
}

.message-hide {
  transform: translateY(-200px);
}

@keyframes flyin {
  from {
    transform: translateY(-200px);
  }
  to {
    transform: translateY(0);
  }
}

</style>
