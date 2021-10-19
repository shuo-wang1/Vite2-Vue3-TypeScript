<template>
  <div class="wrap">
    <header class="wrap-header">
      <div class="wrap-header-logo">HOME</div>
      <div class="wrap-header-user">
        <div class="wrap-header-user-avatar">
          <!-- <img :src="userData.avatar" alt=""> -->
          <img :src="userData.avatar" alt="">
        </div>
        <div class="wrap-header-user-name">
          {{userData.username}}
        </div>
        <div class="wrap-header-user-line">
          |
        </div>
        <div class="wrap-header-user-logout">
          退出
        </div>
      </div>
    </header>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, reactive } from 'vue';

export default defineComponent({
  name: 'VHeader',
  setup() {
    const state: any = inject('UserStore');
    // 用户信息
    const userData = reactive({
      avatar: state.avatar,
      username: state.nickname,
    });
    const avatarClicked = () => {};
    const usernameClicked = () => {};

    return {
      avatarClicked,
      usernameClicked,
      userData,
      state,
    };
  },
});
</script>

<style lang="scss">
.wrap {
  width: 100%;
  &-header {
    @include flex-wrap-between-center;
    width: 100%;
    height: px(137);
    padding: 0 px(47);
    // background: linear-gradient(0deg, #306eb6, #3476c4);
    border-bottom: px(1) solid #fff;
    &-logo {
      font-size: px(36);
      color: #333;
    }
    &-user {
      @include flex-wrap-end-center;
      font-size: px(17);
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      &-avatar {
        cursor: pointer;
        width: px(48);
        height: px(48);
        border-radius: 50%;
        overflow: hidden;
        border: px(2) solid #fff;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &-name {
        cursor: pointer;
        margin-left: px(10);
      }
      &-line {
        margin-left: px(15);
      }
      &-logout {
        cursor: pointer;
        margin-left: px(10);
      }
    }
  }
}
</style>
