import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueVirtualScroller from 'vue-virtual-scroller'

Vue.use(VueVirtualScroller)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
