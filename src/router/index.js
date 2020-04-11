import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Enter from '../views/enter.vue'
import Home from '../views/Home.vue'
import option from '../views/option.vue'
import optionshow from '../views/optionshow.vue'

import KT__list from '../views/KT__list.vue'
import KToption from '../views/KToption'
import NEWkt from '../views/NEWkt'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Enter',
    component: Enter
    // 主页，测试计划和kt配置选择
  },
  {
    path: '/option',
    name: 'option',
    component: option
    // 方案配置页面，方案修改页面
  },
  {
    path: '/plan',
    name: 'Home',
    component: Home
    // 计划列表页面
  },
  {
    path: '/optionshow',
    name: 'optionshow',
    component: optionshow
    // 配置查看页面
  },
  {
    path: '/KT__list',
    name: 'KT__list',
    component: KT__list
    // kt配置列表
  },
  {
    path: '/KToption',
    name: 'KToption',
    component: KToption
    // kt配置页面
  }
  ,
  {
    path: '/NEWkt',
    name: 'NEWkt',
    component: NEWkt
    // kt新设备新增页面
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
