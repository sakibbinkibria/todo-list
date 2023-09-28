import Vue from 'vue'
import App from './App.vue'
import store from './store'
import "font-awesome/css/font-awesome.css";
import './main.css';

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
