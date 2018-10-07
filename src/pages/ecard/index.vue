<template>
  <div class="ecard-page">
    <div class="ecard">
      <div class="logo">UESTC</div>
      <div class="number">{{ cardNumber }}</div>
      <div class="info">
        <div class="name">
          <div class="title">持卡人姓名</div>
          <div class="content">{{ stunumber }}</div>
        </div>
        <div class="expiry">
          <div class="title">有效期</div>
          <div class="content">{{ expiry }}</div>
        </div>
      </div>
    </div>

    <div class="money">
      <div class="balance block">
        <div class="title">余额</div>
        <div class="content">{{ balance }}</div>
      </div>
      <div class="uncashed-balance block">
        <div class="title">待领取</div>
        <div class="content">{{ uncashedBalance }}</div>
      </div>
      <div class="block">
        <div class="title">状态</div>
        <div class="content">{{ status }}</div>
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
      <div class="loading" v-if="loading">正在加载</div>
    </div>

  </div>
</template>

<script>
import api from '@/service/api'
import db from '@/service/db'

export default {
  data () {
    return {
      cardNumber: '*** *** ***',
      stunumber: '*********',
      expiry: '****-**-**',
      balance: '***',
      uncashedBalance: '***',
      status: '--',
      chart: [],
      detailData: [],
      loading: false,

      page: 1,
      type: 2 // 2=消费|1=充值|3=易支付电控
    }
  },

  async onLoad () {
    const { token, username } = await db.get(['token', 'username'])
    wx.showLoading({ title: '正在拉取数据' })

    const info = await api.getEcardInfo({ token, username })

    if (info.success) {
      this.cardNumber = this.beautifyCardNumber(info.data.number)
      this.stunumber = username
      this.expiry = info.data.date
      this.balance = info.data.balance
      this.uncashedBalance = info.data.uncashed_balance
      this.status = info.data.status
    }

    const chart = await api.getEcardStat({ token, username })

    if (chart.success) {
      const max = Math.max(...(chart.data.map(v => v[2])))
      this.chart = chart.data.map((v, i) => {
        return {
          height: `height: ${v[2] / max * 100}%`,
          money: v[2],
          date: v[0],
          card: v[1]
        }
      })
    }

    await this.loadDetail()

    wx.hideLoading()
  },

  async onReachBottom () {
    if (this.loading) return
    this.loading = true
    await this.loadDetail()
    this.loading = false
  },

  methods: {
    /**
     * 填充卡号
     * @param{String}: n
     */
    beautifyCardNumber (n) {
      console.log(n)
      let ret = '000 000 ' + n.slice(0, 3) + ' ' + n.slice(3)
      console.log(n)
      return ret
    },
    async loadDetail () {
      wx.showNavigationBarLoading()
      const { token, username } = await db.get(['token', 'username'])

      const history = await api.getEcardHistory({
        token,
        username,
        page: this.page,
        type: this.type,
        date_range: 180
      })

      if (history.success) {
        const data = history.data.detail.map ? history.data.detail : Object.values(history.data.detail)
        this.detailData = this.detailData.concat(data.map(v => {
          return {
            date: this.split(v.date, [4, 2, 2]).join('-'),
            time: this.split(v.time, [2, 2, 2]).join(':'),
            device: v.device,
            price: v.price.toFixed(1)
          }
        }))
        this.page += 1
      }

      wx.hideNavigationBarLoading()
    },
    split (s, pattern) {
      s = s.toString()
      let ret = []
      for (let i = 0, j = 0; i < s.length && j < pattern.length; i += pattern[j++]) {
        ret.push(s.slice(i, i + pattern[j]))
      }
      return ret
    }
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
          max-width: 80%;
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

    .loading {
      font-size: 14px;
      color: #eee;
      text-align: center;
      padding: 10px;
    }
  }
}
</style>
