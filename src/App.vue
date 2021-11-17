<template>
  <router-view v-slot="{ Component }">
    <keep-alive include="index, history">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {},
});
</script>

<style lang="scss"></style>
