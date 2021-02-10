import STATE from './state';
import GETTERS from './getters';
import ACTIONS from './actions';
import MUTATIONS from './mutations';

export default {
  namespaced: true,
  state: STATE,
  getters: GETTERS,
  mutations: MUTATIONS,
  actions: ACTIONS,
};
