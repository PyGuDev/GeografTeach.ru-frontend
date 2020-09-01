import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
Vue.use(axios)

const store = new Vuex.Store({
    state: {
        backendUrl: "https://geografteach.ru/api",
        status: '',
        token: localStorage.getItem('token') || '',
        user: localStorage.getItem('user') || '',
        id: localStorage.getItem('id') || '',
        is_admin: localStorage.getItem('is_admin') || false,
    },
    mutations: {
        auth_request(state){
            state.status = 'loading'
          },
          auth_success(state, token, user){
            state.status = 'success'
            state.token = token
            state.user = user
          },
          auth_error(state){
            state.status = 'error'
          },
          logout(state){
            state.status = ''
            state.token = ''
          },
    },
    actions: {
        login({commit}, user){
            return new Promise((resolve, reject) => {
              commit('auth_request')
              axios({url: `${this.getters.getServerUrl}/user/singin/`, data: user, method: 'POST' })
              .then(resp => {
                const token = 'Token ' + resp.data.token
                const user = resp.data.user
                const id = resp.data.id
                const is_admin = resp.data.admin
                localStorage.setItem('token', token)
                localStorage.setItem('user', user)
                localStorage.setItem('id', id)
                localStorage.setItem('is_admin', is_admin)
                axios.defaults.headers.common['Authorization'] = token
                commit('auth_success', token, user)
                resolve()
              })
              .catch(err => {
                commit('auth_error')
                localStorage.removeItem('token')
                reject(err)
              })
            })
        },
        register({commit}, user){
            return new Promise((resolve, reject) => {
              commit('auth_request')
              axios({url: `${this.getters.getServerUrl}/user/register/`, data: user, method: 'POST' })
              .then(resp => {
                resolve()
              })
              .catch(err => {
                commit('auth_error', err)
                reject(err)
              })
            })
        },
        logout({commit}){
            return new Promise((resolve, reject) => {
              commit('logout')
              localStorage.removeItem('token')
              delete axios.defaults.headers.common['Authorization']
              resolve()
            })
        }
        
    },
    modules: {},
    getters: {
        getServerUrl: state => {
            return state.backendUrl;
        },
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        getUser: state => state.user,
        getUserId : state => state.id,
        getStatusAdmin: state => state.is_admin,
    }

})

export default store