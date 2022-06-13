<!--
 * @Author: Shuo Wang
 * @Date: 2021-12-20 09:52:17
 * @LastEditTime: 2022-06-13 18:40:05
 * @LastEditors: Shuo Wang
 * @Description: 首页
 * @FilePath: /vite-vue3-ts-/src/view/normalPage/index/index.vue
 * 专业写bug，副业改bug
-->
<template>
  <div class="index">
    <main class="index-main">
      <div class="index-main-container">
        <div class="index-main-container-title">生活就在你熟视无睹的瞬间</div>

        <div class="index-main-container-content">
          <div>
            <!-- <div
              class="index-main-container-table"
              v-for="(item, index) in tableData"
              :key="index"
            >
              <div class="index-main-container-table-title">
                {{ index >= 1 ? (index <= 1 ? '可以' : '不可以') : item.title }}
              </div>

              <div class="index-main-container-table-content"></div>
            </div> -->

            <Carousel
              :height="'250px'"
              @handlerItemClicked="handlerItemClicked"
            ></Carousel>
          </div>
        </div>
      </div>
      <aside class="index-main-aside">
        <div class="user-info">
          <div class="user-info-avatar">
            <img src="/@/assets/images/avatar.png" alt="" />
          </div>
          <div class="user-info-username">Mr.Wang</div>
          <div class="user-info-email">邮箱：shuo.wang11@outlook.com</div>
        </div>
      </aside>
    </main>

    <!-- <div class="bgm">
          <audio id="audio" :src="bgmSrc" autoplay loop></audio>
    </div>-->
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { dataList, listDataInterFace } from './index';

//
// import bgm from '/@/assets/music/a128_1bde_cd7b_99f700e0a7d1cb6e793b8f7b64d82f52.mp3';

export default defineComponent({
  name: 'index',

  setup() {
    // const bgmSrc = bgm;

    const tableData: listDataInterFace[] = dataList;
    onMounted(() => {
      // let audio = document.querySelector('audio');
      // console.log('audio:', audio);
      // audio?.play();
    });

    const handlerItemClicked = (value: any) => {
      console.log('value: ', value);
    };

    return {
      tableData,
      handlerItemClicked,
      // bgmSrc
    };
  },
});
</script>

<style lang="scss" scoped>
.index {
  @include flex-layout(column, nowrap, flex-start, center);
  width: 100%;
  padding: px(30) 0;
  height: 2000px;
  &-main {
    @include flex-layout(row, nowrap, space-between, flex-start);
    width: px(1600);
    padding: px(20) 0;
    &-container {
      @include flex-layout(column, nowrap, flex-start, center);
      width: px(1200);
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

.index-main-container {
  &-title {
    width: 100%;
    padding: px(30) px(20);
    border-radius: px(15);
    text-align: center;
    font-size: px(40);
    color: #000;
    background-color: #ffffff;
  }

  &-content {
    width: 100%;

    padding: px(20) px(30) px(50);
    margin-top: px(30);
    border-radius: px(15);
    background-color: #fff;
  }
}

.index-main-container-content-table {
  @include flex-layout(column, nowrap, flex-start, flex-start);
  width: 100%;
  padding: px(30) px(20);

  background-color: #fff;
  &-title {
    width: 100%;
  }
  &-content {
    width: 100%;
  }
}

.user-info {
  @include flex-layout(column, nowrap, center, center);
  width: 100%;
  font-size: px(20);
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
