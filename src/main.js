import Vue from 'vue'
import App from './App.vue'
import router from './routes/index';
import vuetify from './plugins/vuetify'
import toast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.config.productionTip = false
Vue.use(toast, { position: 'top-right', duration: 3000 });

new Vue({
  router,
  vuetify,
  toast,
  render: h => h(App)
}).$mount('#app')
