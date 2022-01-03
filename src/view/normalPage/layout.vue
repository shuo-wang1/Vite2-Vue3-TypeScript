<!--
 * @Author: Shuo Wang
 * @Date: 2021-12-20 09:52:17
 * @LastEditTime: 2021-12-24 09:59:11
 * @LastEditors: Shuo Wang
 * @Description:  测试页面
 * @FilePath: /vite-vue3-ts-/src/view/normalPage/layout.vue
 * 专业写bug，副业改bug
-->
<template>
  <div class="layout">
    <v-header class="header" />
    <router-view class="layout-view"></router-view>
    <v-footer class="footer" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VFooter from '/com/layout/footer.vue';
import VHeader from '/com/layout/header.vue';

export default defineComponent({
  name: 'index',
  components: {
    'v-header': VHeader,
    'v-footer': VFooter,
  },

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.layout {
  // @include flex-column-start-center;
  @include flex-layout(column, wrap, flex-start, center);
  width: 100%;
  min-height: 100vh;
  background-color: #f6f6f6;
  background: #e0eafc; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #cfdef3,
    #e0eafc
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #cfdef3,
    #e0eafc
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  &-view {
    flex: 1;
  }
}
</style>
