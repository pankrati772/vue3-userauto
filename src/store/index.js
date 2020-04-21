import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url:'http://192.168.4.83:8080',
    autoURL:'http://192.168.4.83/autotest',
    planURL:'http://192.168.4.77:8080/autotest',

    api:{
      DeleteById:'/plan/deleteById',//根据方案id删除方案
      Plangetall:'/plan/getAll',//获取所有测试方案
      

    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
