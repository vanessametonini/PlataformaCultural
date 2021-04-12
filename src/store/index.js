import Vue from 'vue';
import Vuex, { Store } from 'vuex';
// import createPersistedState from 'vuex-persistedstate';
import ModuleUsers from './modules/users';
import ModuleCategories from './modules/categories/index';
import ModuleTopics from './modules/topics/index';
import ModulePins from './modules/pins/index';
import ModuleEvents from './modules/events/index';
import ModuleServices from './modules/services';
import ModuleImages from './modules/images/index';
import ModuleMaps from './modules/maps/index';
import ModuleSocket from './modules/sockets/index';
import STATE from './state';
import GETTERS from './getters';
import ACTIONS from './actions';
import MUTATIONS from './mutations';

Vue.use(Vuex);

const store = new Store({
  devtools: true,
  // plugins: [
  //   createPersistedState(),
  // ],
  modules: {
    categories: ModuleCategories,
    topics: ModuleTopics,
    pins: ModulePins,
    events: ModuleEvents,
    users: ModuleUsers,
    services: ModuleServices,
    maps: ModuleMaps,
    images: ModuleImages,
    sockets: ModuleSocket,
  },
  state: STATE,
  getters: GETTERS,
  mutations: MUTATIONS,
  actions: ACTIONS,
});

export default store;
