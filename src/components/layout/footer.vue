<template>
  <footer class="footer">王硕</footer>
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
