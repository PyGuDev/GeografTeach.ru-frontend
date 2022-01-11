import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
Vue.use(axios)

const store = new Vuex.Store({
    state: {
        backendUrl: "http://127.0.0.1:8000/api",
        status: '',
        access_token: localStorage.getItem('access_token') || '',
        token_expire: localStorage.getItem('token_expire') || '',
        refresh_token: localStorage.getItem('refresh_token') || '',
        user: localStorage.getItem('user') || '',
        id: localStorage.getItem('id') || '',
        is_admin: localStorage.getItem('is_admin') || false,
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, access_token, refresh_token, expire, user) {
            state.status = 'success'
            state.access_token = access_token
            state.refresh_token = refresh_token
            state.token_expire = expire
            state.user = user
        },
        refresh_token_success(state, access_token, expire) {
            state.status = 'success'
            state.access_token = access_token
            state.token_expire = expire
        },
        token_expired(state){
            state.access_token = ''
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.access_token = ''
            state.refresh_token = ''
        },
    },
    actions: {
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: `${this.getters.getServerUrl}/user/singin/`, data: user, method: 'POST'})
                    .then(resp => {
                        const access_token = resp.data.access
                        const refresh_token = resp.data.refresh
                        const token_expire = resp.data.token_expire
                        const user = resp.data.user
                        localStorage.setItem('access_token', access_token)
                        localStorage.setItem('refresh_token', refresh_token)
                        localStorage.setItem('token_expire', token_expire)
                        localStorage.setItem('user', user)
                        commit('auth_success', access_token, refresh_token, token_expire, user)
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
                        resolve()
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('access_token')
                        localStorage.removeItem('refresh_token')
                        reject(err)
                    })
            })
        },
        refresh_token({commit}) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                let data = {
                    "refresh": this.state.refresh_token
                }
                axios({url: `${this.getters.getServerUrl}/user/token/refresh`, data: data, method: 'POST'})
                    .then(resp => {
                        const access_token = resp.data.access
                        const expire = resp.data.token_expire
                        localStorage.setItem('access_token', access_token)
                        localStorage.setItem('token_expire', expire)
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
                        commit('refresh_token_success', access_token, expire)
                        resolve(access_token)
                    })
                    .catch(err => {
                        commit('auth_error')
                        reject(err)
                    })
            })
        },
        register({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: `${this.getters.getServerUrl}/user/register/`, data: user, method: 'POST'})
                    .then(resp => {
                        resolve()
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        reject(err)
                    })
            })
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                localStorage.removeItem('token_expire')
                localStorage.removeItem('user')
                localStorage.removeItem('id')
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
        isLoggedIn: state => !!state.access_token,
        authStatus: state => state.status,
        getUser: state => state.user,
        getUserId: state => state.id,
        getStatusAdmin: state => state.is_admin,
        getAccessToken: state => state.access_token,
        getRefreshToken: state => state.refresh_token,
        getTokenExpire: state => state.token_expire,
    }

})

export default store