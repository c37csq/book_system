import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Banner from '../components/banner/Banner.vue'
import List from '../components/book/List.vue'
import Cate from '../components/book/Cate.vue'
import EditBook from '../components/book/EditBook.vue'
import Message from '../components/message/Message.vue'
import Bar from '../components/info/Bar.vue'
import Columnar from '../components/info/Columnar.vue'
import Pie from '../components/info/Pie.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/banner', component: Banner },
      { path: '/list', component: List },
      { path: '/list/editbook/:id', component: EditBook },
      { path: '/cate', component: Cate },
      { path: '/message', component: Message },
      { path: '/line', component: Bar },
      { path: '/columnar', component: Columnar },
      { path: '/pie', component: Pie }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const openId = window.sessionStorage.getItem('openId')
  if (!openId) return next('/login')
  next()
})

export default router
