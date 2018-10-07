<template>
  <div class="ecard-page">
    <div class="ecard">
      <div class="logo">UESTC</div>
      <div class="number">2014 000 201010</div>
      <div class="info">
        <div class="name">
          <div class="title">持卡人姓名</div>
          <div class="content">张义飞</div>
        </div>
        <div class="expiry">
          <div class="title">有效期</div>
          <div class="content">2018/02/12</div>
        </div>
      </div>
    </div>

    <div class="money">
      <div class="balance block">
        <div class="title">余额</div>
        <div class="content">123.5</div>
      </div>
      <div class="uncashed-balance block">
        <div class="title">待领取</div>
        <div class="content">100</div>
      </div>
      <div class="block">
        <div class="title">状态</div>
        <div class="content">正常</div>
      </div>
    </div>

    <div class="detail">
      <div class="chart">
        <div class="title">近期消费趋势</div>
        <div class="content">
          <div class="bar" v-for="(v, i) in chart" :key="i" :style="v.height"></div>
        </div>
      </div>
      <div class="list">
        <div class="title">消费详情</div>
        <div class="item" v-for="(v, i) in detailData" :key="i">
          <div class="info">
            <div class="device">{{ v.device }}</div>
            <div class="time">{{ v.date }} {{ v.time }}</div>
          </div>
          <div class="price">{{ v.price }}</div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  data () {
    return {
      chart: [],
      detailData: []
    }
  },

  async onLoad () {
    const chartData = new Array(15).fill(0).map((v, i) => parseInt(Math.random() * 40))
    const max = Math.max(...chartData)
    this.chart = chartData.map((v, i) => {
      return {
        height: `height: ${v / max * 100}%`,
        money: v,
        date: v,
        card: v
      }
    })
    this.detailData = new Array(20).fill({
      date: '2018-06-23',
      time: '23:15',
      device: '硕士21栋超市POS4新增',
      price: 12.5
    })
  }
}
</script>

<style lang="less" scoped>
@import '../../style/common.less';

.ecard-page {
  background-color: #eee;
  padding-top: 100px;
  .ecard {
    margin: 0 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    background: linear-gradient(to right, rgb(129, 132, 147), rgb(80, 80, 100));
    padding: 20px;
    border-radius: 5px;
    color: rgb(80, 80, 100);
    .logo {
      font-size: 25px;
      letter-spacing: 2px;
      text-shadow: 0 1px 1px #fff;
    }
    .number {
      font-size: 20px;
      letter-spacing: 2px;
      margin: 20px 0;
      text-shadow: 0 1px 1px #fff;
    }
    .info {
      display: flex;
      justify-content: space-between;

      .title {
        font-size: 12px;
        text-shadow: 0.5px 0.5px 0 rgba(255, 255, 255, 0.5);
      }
      .content {
        margin-top: 5px;
        font-size: 14px;
        text-shadow: 0.5px 0.5px 0 rgba(255, 255, 255, 0.5);
      }
    }
  }

  .money {
    display: flex;
    padding: 20px;
    background-color: #fff;
    margin-top: -10px;
    border-bottom: 1px solid #eee;
    box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.2);

    .block {
      min-width: 33%;
      max-width: 33%;

      .title {
        font-size: 14px;
        color: #aaa;
      }
      .content {
        margin-top: 5px;
        font-size: 24px;
      }
    }

    .balance, .uncashed-balance {
      .content:before {
        content: '￥';
      }
    }
  }

  .detail {
    background-color: #fff;
    padding: 20px 0;

    .chart {
      margin-left: 20px;
      margin-top: 10px;
      margin-bottom: 10px;
      .title {
        font-size: 14px;
        color: #aaa;
      }
      .content {
        margin-top: 20px;
        height: 100px;
        display: flex;
        align-items: flex-end;

        .bar {
          width: 10px;
          margin: 5px;
          border-radius: 10px;
          background-color: @main-color;
        }
      }
    }

    .list {
      padding: 0 20px;

      .title {
        font-size: 14px;
        color: #aaa;
        margin-top: 30px;
        margin-bottom: 10px;
      }
      .item {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 0.5px solid #eee;

        .info {
          .device {
            font-size: 16px;
          }
          .time {
            margin-top: 5px;
            font-size: 14px;
            color: #aaa;
          }
        }

        .price {
          font-size: 24px;

          &:before {
            content: '-';
          }
        }
      }
    }
  }
}
</style>
