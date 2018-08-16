<template>
  <view class="grade-page">
    <GradeHeader title="思而不学则殆"
      subtitle="Thought without learning is perilous."/>
    
    <view class="content">
      <view class="card summary-card">
        成绩总览
      </view>
    </view>
  </view>
</template>

<script>
import Header from '@/components/Header'

export default {
  data () {},
  components: {
    GradeHeader: Header
  }
}
</script>

<style lang="less" scoped>
@import '../../../style/common.less';

.grade-page {
  .content {
    padding: 0 20px;
  }
}
</style>