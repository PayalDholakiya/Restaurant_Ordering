import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Cart from '../views/Cart.vue'
import firebase from 'firebase'
import Order from '../views/Order.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/sign-in',
    component: SignIn,
  },
  {
    path: '/sign-up',
    component: SignUp,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some((record) => record.meta.requireAuth)
  console.log(firebase.auth())
  if (requireAuth && !currentUser) {
    next('/sign-in')
  } else {
    next()
  }
})

export default router
