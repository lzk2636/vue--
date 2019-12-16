import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/base.less'
import axios from 'axios';
import {getToken} from '@/utils/token.js'

Vue.prototype.$axios = axios;
axios.defaults.baseURL = process.env.VUE_APP_BASEURL
//添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (getToken()) {
      window.console.log(2)
       config.headers.common['Authorization'] =getToken();
      // config.headers.common.Authorization = getToken();
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  });

Vue.use(ElementUI);
Vue.config.productionTip = false
// window.console.log(process.env.VUE_APP_BASEURL)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
