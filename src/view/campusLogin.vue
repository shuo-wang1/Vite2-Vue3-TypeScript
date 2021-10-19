<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { LoginParams, loginService } from '../api/login';

export default defineComponent({
  name: 'login',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state: any = inject('UserStore');
    // console.log('state: ', state);

    const loginParams: LoginParams = {
      sub: route.query.sub ? (route.query.sub as string) : '',
      jobNumber: route.query.jobNumber ? (route.query.jobNumber as string) : '',
    };

    if (!loginParams.sub || !loginParams.jobNumber) {
      location.href =
        'https://ids.tongji.edu.cn:8443/nidp/oauth/nam/authz?scope=profile&response_type=code&redirect_uri=http://tjanswer.xun-ao.com/callback&client_id=6819be59-c4b2-4dc4-b2d3-b2269ded846b';
    }

    const redirect = async () => {
      const res = await loginService.userLogin(loginParams);
      // console.log('res: ', res);
      if (res.data.code === 200) {
        state.token = res.data.token;
        // console.log('state: ', state);
        getUserInfo();
      }
    };

    const getUserInfo = async () => {
      const res = await loginService.userInfo();
      // console.log('state: ', state);

      // console.log('res: ', res);
      state.username = res.data.data.userName;
      state.gender = res.data.data.sex;
      state.nickname = res.data.data.nickName;
      state.avatar = res.data.headImg;
      router.push({ path: '/index' });
    };
    return {
      redirect,
      getUserInfo,
    };
  },
  mounted() {
    this.redirect();
  },
});
</script>

<style lang="scss" scoped>
</style>
