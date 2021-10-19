<template>
  <div class="index">
    <main class="index-main">
      <div>
        <p>反洗钱风险</p>
        <p style="margin-top: 5px">
          <span style="color: #e79f52">1.{命中对象1（业务身份）}</span
          >反洗钱风险等级为<span style="color: #cd544d">【高】</span>,<span
            style="color: #cd544d"
            >命中金融制裁与敏感名单</span
          >
        </p>
        <p style="margin-top: 10px">工商核验</p>
        <p style="margin-top: 5px">
          <span style="color: #e79f52">上海开心彩虹科技有限公司</span
          >当前经营状态为吊销
        </p>
        <p style="margin-top: 15px">上述风险将无法进入下一步流程，请按需处理</p>
      </div>

      <div style="margin-top: 100px">
        <p>我行关联方核验</p>
        <p style="margin-top: 5px">
          <span style="color: #e79f52"
            >张三、王五、赵六、李七、上海真开心科技游戏公司、刘八</span
          >为我行关联方，继续业务须执行我行关联交易管理要求，向董事会关联交易控制委员会备案
        </p>

        <p style="margin-top: 15px">资金归集</p>
        <p style="margin-top: 5px">
          <span style="color: #e79f52">王五</span>已被作为支付对象12次
        </p>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage as Message } from 'element-plus';

export default defineComponent({
  name: 'index',

  setup() {},
});
</script>

<style lang="scss" scoped>
.index {
  @include flex-column-between-center;
  width: 100%;
  padding: px(30) 0;
  &-main {
    width: px(1200);
    // height: px(400);
    padding: px(20);
    background-color: #ffffff;
  }
}
</style>
