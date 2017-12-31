import Vue from 'vue'
import VueRouter from 'vue-router'
import Weibo from '../components/SinaWeibo.vue'
import Counter from '../components/Counter.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      //重定向
      path: '/',
      redirect: '/weibo'
    },
    {
      path: '/weibo',
      component: Weibo
    },
    {
      name: 'counter',
      path: '/counter/:appId',
      component: Counter
    }
  ]
})
