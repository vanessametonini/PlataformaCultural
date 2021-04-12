import Vue from 'vue';
import VueRouter from 'vue-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueMasonry from 'vue-masonry-css';
import { gsap } from 'gsap';
import Vuelidate from 'vuelidate';
import 'leaflet/dist/leaflet.css';
import './registerServiceWorker';
import './quasar';
import router from './router';
import store from './store';
import App from './App.vue';
import LogoCard from './components/Logo.vue'; // logo da plataforma
import MulticolorLine from './components/ColorLine.vue';
import titleMixin from './mixins/title'
import VueAnalytics from 'vue-analytics'
import money from 'v-money'
import './quasar'
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
  // options: { path: "/my-app/" } //Optional options
}))

Vue.use(VueAnalytics, {
  id: 'UA-162276539-1',
  router
})
Vue.use(money, {precision: 4})

library.add(faUserSecret);
gsap.config({
  nullTargetWarn: false,
});


Vue.component('LogoCard', LogoCard);
Vue.component('MulticolorLine', MulticolorLine);
Vue.component('FontAwesomeIcon', FontAwesomeIcon);
Vue.mixin(titleMixin)
Vue.use(VueMasonry);
Vue.use(Vuelidate);
Vue.use(VueRouter);
Vue.config.productionTip = false;
Vue.config.devtools = true;


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
