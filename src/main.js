import Vue from 'vue'
import App from './App.vue'
import { Table, Input, Modal, Field, Icon } from 'buefy'
import 'buefy/dist/buefy.css'


Vue.use(Table)
Vue.use(Input)
Vue.use(Modal)
Vue.use(Field)
Vue.use(Icon)



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
