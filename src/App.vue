<template>
  <router-view v-slot="{ Component }">
    <keep-alive include="index, history">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<script lang="ts">
import { defineComponent, provide, readonly, ref } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const pageType = ref('');
    window.onresize = () => {
      updatePageType();
    };

    const updatePageType = () => {
      const width: number = document.body.offsetWidth;
      if (width < 500) {
        pageType.value = 'mobile';
      } else if (500 <= width && width < 800) {
        pageType.value = 'pad';
      } else if (width >= 800) {
        pageType.value = 'pc';
      }
    };
    updatePageType();

    provide('pageType', readonly(pageType));
    provide('updatePageType', updatePageType);
  },
});
</script>

<style lang="scss"></style>
