import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/base.less'
import store from '@/store/store'

Vue.use(ElementUI);
Vue.config.productionTip = false
// window.console.log(process.env.VUE_APP_BASEURL)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
