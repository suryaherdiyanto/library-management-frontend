import "./assets/scss/app.scss";

// Plugin init
import axiosPlugin from '../src/plugins/axios';
import validationPlugin from '../src/plugins/validation';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.use(axiosPlugin, {
    baseURL: process.env.VUE_APP_API_ENDPOINT,
    timeout: 50000
});
app.use(store);
app.use(router);
app.use(validationPlugin, {});
app.mount('#app');
