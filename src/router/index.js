import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('views/home/Home.vue')
const Category = () => import('views/category/Category.vue')
const Cart = () => import('views/cart/Cart.vue')
const Profile = () => import('views/profile/Profile.vue')
const Detail = () => import('views/detail/Detail.vue')


// 防止重复点击切换路由造成错误
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/detail/:iid',
      component: Detail
    }
  ]
})