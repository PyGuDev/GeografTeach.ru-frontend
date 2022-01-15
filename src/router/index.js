import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Blog from '../views/Blog'
import File from '../views/File'
import BlogSingl from '../views/BlogSingl'
import SingUp from '../views/SingUp'
import SingIn from '../views/SingIn'
import Help from '../components/Help.vue'
import Lk from '../views/Lk'
import Task from '../views/Task'
import Chat from '../views/Chat'
import Test from '../views/Test'
import TestSession from '../views/TestSession'
import TestResult from '../views/TestResult'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Сайт учителя географии'
        }

    },
    {
        path: '/blog',
        name: 'Blog',
        component: Blog,
        meta: {
            title: 'Статьи'
        }
    },
    {
        path: '/files',
        name: 'File',
        component: File,
        meta: {
            title: 'Файлы, документы'
        }
    },
    {
        path: '/blog/article/:id',
        name: 'BlogSingl',
        component: BlogSingl,
        props: true,
        meta: {
            title: 'Статья'
        }
    },
    {
        path: '/user/singup',
        name: 'SingUp',
        component: SingUp,
        meta: {
            title: 'Регистрация'
        }
    },
    {
        path: '/user/singin',
        name: 'SingIn',
        component: SingIn,
        meta: {
            title: 'Авторизация'
        }
    },
    {
        path: '/user/help',
        name: 'Help',
        component: Help,
        meta: {
            title: 'Помощь'
        }
    },
    {
        path: '/user/lk',
        name: 'Lk',
        component: Lk,
        meta: {
            title: 'Личный кабинет'
        }
    },
    {
        path: '/user/lk/task/:id',
        name: 'Task',
        component: Task,
        props: true,
        meta: {
            title: 'Здача'
        }
    },
    {
        path: '/user/lk/chat',
        name: 'Chat',
        component: Chat,
        meta: {
            title: 'Чат'
        }
    },
    {
        path: '/user/lk/test',
        name: 'Test',
        component: Test,
        meta: {
            title: 'Тесты'
        }
    },
    {
        path: '/user/lk/test/:testId/session',
        name: 'TestSession',
        component: TestSession,
        props: true,
        meta: {
            title: 'Тест'
        }
    },
    {
        path: '/user/lk/test/:testId/session/:sessionId/result',
        name: 'TestResult',
        component: TestResult,
        props: true,
        meta: {
            title: 'Резултаты тестов'
        }
    },

]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
    Vue.nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE;
    });
})

export default router
