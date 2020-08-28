import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import About from '../views/About'
import Blog from '../views/Blog'
import File from '../views/File'
import BlogSingl from '../views/BlogSingl'
import SingUp from '../views/SingUp'
import SingIn from '../views/SingIn'
import Help from '../components/Help.vue'
import Lk from '../views/Lk'
import Task from '../views/Task'
import Chat from '../views/Chat'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/files',
    name: 'File',
    component: File
  },
  {
    path: '/blog/article/:id',
    name: 'BlogSingl',
    component: BlogSingl,
    props: true
  },
  {
    path: '/user/singup',
    name: 'SingUp',
    component: SingUp
  },
  {
    path: '/user/singin',
    name: 'SingIn',
    component: SingIn
  },
  {
    path: '/user/help',
    name: 'Help',
    component: Help
  },
  {
    path: '/user/lk',
    name: 'Lk',
    component: Lk
  },
  {
    path: '/user/lk/task/:id',
    name: 'Task',
    component: Task,
    props: true
  },
  {
    path: '/user/lk/chat',
    name: 'Chat',
    component: Chat
  }
  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
