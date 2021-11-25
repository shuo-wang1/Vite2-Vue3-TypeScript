import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: () => {
      return { path: '/home/index' };
    },
  },
  {
    path: '/layout',
    name: 'layout',
    component: () =>
      import(/* webpackChunkName: "layout" */ '/@/view/normalPage/layout.vue'),
    redirect: () => {
      return { path: '/home/index' };
    },
    children: [
      {
        path: '/home/index',
        name: 'index',
        component: () =>
          import(
            /* webpackChunkName: "index" */ '/@/view/normalPage/index/index.vue'
          ),
        meta: {
          keepAlive: true, // 需要被缓存
          title: '首页',
        },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory('/'),

  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    };
  },
});

// const whiteList = ['/campusLogin'];

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
});
//   //  在跳转路由之前，先清除所有的请求
//   clearPending();
//   // next();
//   // ...
//   const token =
//     localStorage.getItem('UserStore') &&
//     localStorage.getItem('UserStore') != null
//       ? JSON.parse(localStorage.getItem('UserStore') as string).token
//       : '';

//   if (token) {
//     /* has token*/
//     if (to.path === '/login' || to.path === '/campusLogin') {
//       next({ path: '/index' });
//     } else {
//       next();
//     }
//   } else {
//     // 没有token且在白名单内;
//     if (whiteList.indexOf(to.path) !== -1) {
//       next();
//     } else {
//       // 没有token 且不在白名单内
//       next({ path: '/campusLogin' });
//     }
//   }
// });

export default router;
