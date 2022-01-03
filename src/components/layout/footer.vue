<!--
 * @Author: Shuo Wang
 * @Date: 2021-12-20 09:52:17
 * @LastEditTime: 2021-12-24 10:00:30
 * @LastEditors: Shuo Wang
 * @Description:footer
 * @FilePath: /vite-vue3-ts-/src/components/layout/footer.vue
 * 专业写bug，副业改bug
-->
<template>
  <footer class="footer">R & D based on Vite2, Vue and TypeScript</footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VFooter',
  setup() {},
});
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: px(90);
  // background: #414141;
  text-align: center;
  line-height: px(90);
  font-size: px(17);
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333;
  border-top: px(1) solid #fff;
}
</style>
