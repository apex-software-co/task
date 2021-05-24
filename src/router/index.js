import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'appLayout', name: 'Home' },
    component: Home,
  },
  {
    path: '/signup',
    name: 'signUp',
    meta: { layout: 'signup' },
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue')
  },
  {
    path: '/tasks',
    name: 'tasks',
    meta: { layout: 'appLayout', name: 'Tasks' },
    component: () => import(/* webpackChunkName: "about" */ '../views/Task.vue')
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
