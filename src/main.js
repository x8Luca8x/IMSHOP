import 'devextreme/dist/css/dx.common.css';
import './themes/generated/theme.base.css';
import './themes/generated/theme.additional.css';
import { createApp }  from "vue";
import router from "./router";

import App from "./App";
import appInfo from "./app-info";
import api from './api';
import Cart from './cart';
import auth from './auth';

auth.getUser().then(() => 
{
    const app = createApp(App);
    app.use(router);

    app.config.globalProperties.$api = api;
    app.config.globalProperties.$cart = new Cart(api);
    app.config.globalProperties.$appInfo = appInfo;

    app.mount('#app');
});