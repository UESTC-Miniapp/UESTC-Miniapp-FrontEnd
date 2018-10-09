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
        <scroll-view scroll-x v-if="chart.length > 0">
          <div class="content">
            <div class="bar" v-for="(v, i) in chart" :key="i" :style="v.height" @tap="showDetail(i)"></div>
          </div>
        </scroll-view>
        <div class="content-loading" v-else>
          <img src="/static/ecard/loading.svg" alt="" class="icon">
        </div>
      </div>
      <div class="list">
        <div class="title">消费详情</div>
        <div class="tab">
          <EcardTab :tabs="ecardTab" @tabchange="onTabChange" :selected="selected"></EcardTab>
        </div>
        <div class="item" v-for="(v, i) in detailData" :key="i">
          <div class="info">
            <div class="device">{{ v.device }}</div>
            <div class="time">{{ v.date }} {{ v.time }}</div>
          </div>
          <div class="price">{{ ['+', '-'][type - 1] || '' }}{{ v.price }}</div>
        </div>
      </div>
      <div class="loading" v-if="loading">正在加载</div>
    </div>

  </div>
</template>

<script>
import api from '@/service/api'
import db from '@/service/db'

import Tab from '@/components/Tab'

let tabDataCached = {} // 用来存放 消费/充值/电控的缓存数据

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

      ecardTab: [{
        main: '消费',
        data: 2
      }, {
        main: '充值',
        data: 1
      }, {
        main: '电控',
        data: 3
      }],
      selected: 0,

      page: 1,
      type: 2 // 2=消费|1=充值|3=易支付电控
    }
  },

  components: {
    EcardTab: Tab
  },

  onLoad () {
    this.loadData()
  },

  onPullDownRefresh () {
    this.loadData()
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

    async loadData () {
      tabDataCached = {} // 清空缓存
      wx.showLoading({ title: '正在拉取数据' })

      // 将await方法包装成promise
      await Promise.all([this.loadInfo, this.loadChart, this.loadDetail]
        .map(f => new Promise(async (resolve, reject) => {
          try {
            await f()
          } catch (error) {
            console.log('error', error)
            resolve()
          }
          resolve()
        })))
      wx.hideLoading()
    },

    async loadInfo () {
      const { token, username } = await db.get(['token', 'username'])
      const info = await api.getEcardInfo({ token, username })

      if (info.success) {
        this.cardNumber = this.beautifyCardNumber(info.data.number)
        this.stunumber = info.data.nickname
        this.expiry = info.data.date
        this.balance = info.data.balance
        this.uncashedBalance = parseFloat(info.data.uncashed_balance).toFixed(2)
        this.status = info.data.status
      }

      return true
    },

    async loadChart () {
      const { token, username } = await db.get(['token', 'username'])
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

      return true
    },

    async loadDetail () {
      wx.showNavigationBarLoading()
      this.loading = true
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

      this.loading = false
      wx.hideNavigationBarLoading()

      return true
    },
    split (s, pattern) {
      s = s.toString()
      let ret = []
      for (let i = 0, j = 0; i < s.length && j < pattern.length; i += pattern[j++]) {
        ret.push(s.slice(i, i + pattern[j]))
      }
      return ret
    },
    showDetail (index) {
      const date = this.split(this.chart[index].date, [4, 2, 2]).join('-')
      const money = this.chart[index].money
      wx.showToast({ title: `${date}共消费${money.toFixed(1)}元`, icon: 'none' })
    },
    onTabChange (i) {
      const index = this.ecardTab[i].data
      tabDataCached[this.type] = {
        page: this.page,
        detailData: this.detailData
      }
      this.type = index
      if (!tabDataCached[index]) {
        this.page = 1
        this.detailData = []
        this.loadDetail()
      } else {
        this.page = tabDataCached[index].page
        this.detailData = tabDataCached[index].detailData
      }
      this.selected = i
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
      margin: 10px 20px;
      .title {
        font-size: 14px;
        color: #aaa;
        margin-bottom: 20px;
      }
      .content {
        height: 100px;
        display: flex;
        align-items: flex-end;

        .bar {
          min-width: 10px;
          margin: 0 5px;
          border-radius: 10px;
          background: linear-gradient(to bottom, rgb(129, 132, 147), rgb(80, 80, 100));
        }
      }
      .content-loading {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;

        .icon {
          height: 40px;
          width: 40px;
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

      .tab {
        background-color: #fff;
        margin-top: 10px;
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
