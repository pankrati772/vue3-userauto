import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Button from 'ant-design-vue/lib/button';
import Input from 'ant-design-vue/lib/input'
import List from 'ant-design-vue/lib/list'
import Avarat from 'ant-design-vue/lib/avatar'
import From from 'ant-design-vue/lib/form'
import Radio from 'ant-design-vue/lib/radio'
import Icon from 'ant-design-vue/lib/icon'
import Message from 'ant-design-vue/lib/message'
import notification from 'ant-design-vue/lib/notification'
import Table from 'ant-design-vue/lib/table'
import popconfirm from 'ant-design-vue/lib/popconfirm'
import 'ant-design-vue/dist/antd.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Button)
Vue.use(Input)
Vue.use(List)
Vue.use(Avarat)
Vue.use(From)
Vue.use(Radio)
Vue.use(Icon)
Vue.use(Message)
Vue.use(notification)
Vue.use(Table)
Vue.use(popconfirm)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
