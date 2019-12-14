import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/base.less'
import axios from 'axios';
Vue.prototype.$axios=axios;
axios.defaults.baseURL=process.env.VUE_APP_BASEURL
Vue.use(ElementUI);
Vue.config.productionTip = false
window.console.log(process.env.VUE_APP_BASEURL)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
