import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios


Vue.prototype.$http.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token')
    if (token == null) {
        return config;
    }

    config.headers.common["Authorization"] = `Bearer ${token}`;
    return config;
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
