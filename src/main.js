import Vue from 'vue'
import App from './App.vue'
import store from './vuexstore/store'
import mask from 'vue-inputmask'

Vue.use(mask.default)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
