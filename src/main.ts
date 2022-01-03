/*
 * @Author: Shuo Wang
 * @Date: 2021-06-07 13:35:29
 * @LastEditTime: 2021-12-24 09:59:47
 * @LastEditors: Shuo Wang
 * @Description: main.ts
 * @FilePath: /vite-vue3-ts-/src/main.ts
 * 专业写bug，副业改bug
 */
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './scss/index.scss';
import store from './store';

const app = createApp(App);

app.use(store).use(ElementPlus).use(router).mount('#app');
