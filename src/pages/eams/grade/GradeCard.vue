<template>
  <div class="grade-card">
    <div class="card-title">
      <img src="/static/book.svg" alt="" class="card-icon">
      <span>{{ title }}</span>
    </div>
    <div class="card-content">
      <div class="table-header table-row">
        <div class="table-block" :style="style[index]"
          v-for="(item, index) in header" :key="index" >{{ item }}</div>
      </div>
      <div class="table-content">
        <div class="table-row" v-for="(item, index) in content" :key="index">
          <div class="table-block" :style="style[subindex]"
            v-for="(subitem, subindex) in item" :key="subindex">{{ subitem }}</div>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="time">学分：{{ summary && summary.sum_point }}</div>
      <div class="location">总科目：{{ summary && summary.course_count }}</div>
      <div class="teacher">加权绩点：{{ summary && summary.aver_gpa }}</div>
    </div>
  </div>
</template>

<script>
const alignTable = {
  'c': 'center',
  'l': 'left',
  'r': 'right'
}
export default {
  props: {
    title: String,
    header: Array,
    styles: Array,
    content: Array,
    summary: Object
  },

  computed: {
    style () {
      return (this.styles || []).map((v, i) => `
        width: ${v.width};
        text-align: ${alignTable[v.align || 'l']}
      `)
    }
  }
}
</script>

<style lang="less">
@import "../../../style/common.less";

.grade-card {
  .card();
  margin-top: 10px;

  .card-content {
    font-size: 14px;

    .table-header {
      color: #aaa;
      border-bottom: 1rpx solid #eee;
    }

    .table-row {
      display: flex;
      padding: 5px 0;

      .table-block {
        flex-grow: 1;
      }
    }
  }
}
</style>