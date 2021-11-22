<template>
  <div class="layout">
    <v-header class="header" />
    <router-view class="layout-view"></router-view>
    <v-Footer class="footer" />
  </div>
</template>

<script lang="ts">
import VHeader from '../components/layout/header.vue';
import VFooter from '../components/layout/footer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'index',
  components: {
    'v-header': VHeader,
    'v-Footer': VFooter,
  },

  setup() {
    return {};
  },
  mounted() {},
});
</script>

<style lang="scss" scoped>
.layout {
  // @include flex-column-start-center;
  @include flex-layout(column, wrap, flex-start, center);
  width: 100%;
  min-height: 100vh;
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
