<template>
  <div class="index">
    <main class="index-main"></main>
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
  @include flex-layout(column, nowrap, flex-start, center);
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
