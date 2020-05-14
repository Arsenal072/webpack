import Vue from 'vue'
import App from './app.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/main.css'

Vue.use(ElementUI);

new Vue({
    render: h=> h(App)
}).$mount('#app')