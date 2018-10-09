<template>
  <div class="tab">
    <scroll-view scroll-x>
      <div class="tab-content">
        <div :class="[i === (selected || 0) ? 'selected' : 'item']" v-for="(v, i) in tabs" :key="i" @tap="onTabSwitch(i)">
          <div class="main">{{ v.main }}</div>
          <div class="tip">{{ v.tip }}</div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
export default {
  props: {
    tabs: Array,
    selected: Number
  },

  methods: {
    onTabSwitch (i) {
      this.$emit('tabchange', i)
    }
  }
}
</script>

<style lang="less" scoped>
.tab {
  .tab-content {
    display: flex;
    align-items: center;

    .item {
      text-align: center;
      padding: 10px 25px;
      border-radius: 5px;
      background: linear-gradient(to right, #eee, #ddd);
      margin-right: 10px;

      .main {
        font-size: 18px;
        color: #000;
      }

      .tip {
        font-size: 12px;
        color: #eee;
        text-shadow: 0.5px 0.5px 0 rgba(0, 0, 0, 0.2);
      }
    }

    .selected {
      .item();
      background: linear-gradient(to right, rgb(129, 132, 147), rgb(80, 80, 100));

      .main {
        color: #fff;
        text-shadow: 0.5px 0.5px 0 rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>
