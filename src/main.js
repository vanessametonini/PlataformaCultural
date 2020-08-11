import Vue from 'vue';
import VueRouter from 'vue-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import VueMasonry from 'vue-masonry-css';

import { gsap } from 'gsap';

import Vuelidate from 'vuelidate';

import 'leaflet/dist/leaflet.css';

import router from './router';
import store from './store';
import './registerServiceWorker';
import App from './App.vue';

import './quasar';

import LogoCard from './components/Logo.vue'; // logo da plataforma
import MulticolorLine from './components/ColorLine.vue';

Vue.component('logo-card', LogoCard);
Vue.component('multicolor-line', MulticolorLine);

// font awesome setups
library.add(faUserSecret);
Vue.component('font-awesome-icon', FontAwesomeIcon);

// window.eventBus = new Vue();

// my packages
Vue.use(VueMasonry);
Vue.use(Vuelidate);
gsap.config({
  nullTargetWarn: false,
});

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(VueRouter);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
