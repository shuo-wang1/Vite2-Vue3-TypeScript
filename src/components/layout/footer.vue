<!--
 * @Author: Shuo Wang
 * @Date: 2021-12-20 09:52:17
 * @LastEditTime: 2022-01-07 09:59:49
 * @LastEditors: Shuo Wang
 * @Description:footer
 * @FilePath: /vite-vue3-ts-/src/components/layout/footer.vue
 * 专业写bug，副业改bug
-->
<template>
  <footer class="footer">
    <p>R & D based on Vite2, Vue and TypeScript</p>
    <p>
      <a href="https://beian.miit.gov.cn/" target="_blank"
        >冀ICP备2021027110号</a
      >
    </p>
  </footer>
</template>

<script lang="ts">
export default defineComponent({
  name: 'VFooter',
  setup() {},
});
</script>

<style lang="scss" scoped>
.footer {
  @include flex-layout(column, nowrap, center, center);
  width: 100%;
  height: px(90);
  // background: #414141;
  text-align: center;

  font-size: px(17);
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333;
  border-top: px(1) solid #fff;
}
</style>
