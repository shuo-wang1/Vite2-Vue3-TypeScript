import { createApp } from 'vue';
import store from './store';
import router from './router';
import App from './App.vue';
import './scss/index.scss';

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App);

app.use(store).use(ElementPlus).use(router).mount('#app');
