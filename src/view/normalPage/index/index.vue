<template>
  <div class="index">
    <main class="index-main">
      <div class="index-main-container">Mr.Wang的个人主页</div>
      <aside class="index-main-aside">
        <div class="user-info">
          <div class="user-info-avatar">
            <img src="/@/assets/images/avatar.png" alt="" />
          </div>
          <div class="user-info-username">Mr.Wang</div>
          <div class="user-info-email">邮箱：845355912@qq.com</div>
        </div>
      </aside>
    </main>
    <!-- <div class="bgm">
          <audio id="audio" :src="bgmSrc" autoplay loop></audio>
    </div>-->
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, inject, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage as Message } from 'element-plus';
import { log } from 'console';
// import bgm from '/@/assets/music/a128_1bde_cd7b_99f700e0a7d1cb6e793b8f7b64d82f52.mp3';

export default defineComponent({
  name: 'index',
  setup() {
    // const bgmSrc = bgm;

    onMounted(() => {
      // let audio = document.querySelector('audio');
      // console.log('audio:', audio);
      // audio?.play();
    });

    return {
      // bgmSrc
    };
  },
});

function creted() {
  throw new Error('Function not implemented.');
}
</script>

<style lang="scss" scoped>
.index {
  @include flex-layout(column, nowrap, flex-start, center);
  width: 100%;
  padding: px(30) 0;
  &-main {
    @include flex-layout(row, nowrap, space-between, flex-start);
    width: px(1600);
    padding: px(20) 0;
    &-container {
      @include flex-layout(column, nowrap, flex-start, center);
      width: px(1200);
      padding: px(30) px(20);
      border-radius: px(15);
      background-color: #ffffff;
    }
    &-aside {
      @include flex-layout(column, nowrap, flex-start, center);
      width: px(380);
      padding: px(30) px(20);
      border-radius: px(15);
      background-color: #ffffff;
    }
  }
}

.user-info {
  @include flex-layout(column, nowrap, center, center);
  width: 100%;
  &-avatar {
    @include flex-layout(row, nowrap, center, center);
    width: px(150);
    height: px(150);
    margin-bottom: px(30);
    border: px(5) solid skyblue;
    border-radius: 50%;
    overflow: hidden;
    background-color: #111;
    img {
      width: 100%;
    }
  }
  &-username {
    margin-bottom: px(15);
  }
  &-email {
    margin-bottom: px(15);
  }
}

.bgm {
  width: 0;
  height: 0;
}
</style>

function creted() { throw new Error('Function not implemented.'); }
