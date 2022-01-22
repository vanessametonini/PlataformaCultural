import Vue from 'vue';
import VueRouter from 'vue-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueMasonry from 'vue-masonry-css';
import { gsap } from 'gsap';
import Vuelidate from 'vuelidate';
import L from 'leaflet'
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
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VSanitize from "v-sanitize";
import {Carousel, Slide} from 'vue-carousel';

// FIX leaflet's default icon path problems with webpack
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

let token = store.state.services.token;

Vue.use(new VueSocketIO({
  debug: process.env.VUE_APP_DEBUG_SOCKET  === "true",
  connection: process.env.VUE_APP_BASE_URL,
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
  options: {
    query: {
      authorization: token
    }
  }
}))

Vue.use(VueAnalytics, {
  id: 'UA-193892283-1',
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
Vue.config.productionTip = process.env.VUE_APP_DEV_TOOLS === "false";
Vue.config.devtools = process.env.VUE_APP_DEV_TOOLS === "true";
Vue.component('carousel', Carousel);
Vue.component('slide', Slide);

const sanitizationOptions = {
  allowedTags: ['div', 'br', 'blockquote', 'strike', 'hr', 'i', 'a', 'b', 'u', 'ul', 'ol', 'li', 'p', 'em', 'strong'],
  allowedAttributes: {
    'a': [ 'href', 'target' ]
  }
};
Vue.use(VSanitize, sanitizationOptions);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
