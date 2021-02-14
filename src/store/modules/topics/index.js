import STATE from './state';
import ACTIONS from './actions';
import MUTATIONS from './mutations';
import GETTERS from './getters';
import REPLIES from './replies';

export default {
  namespaced: true,
  state: STATE,
  actions: ACTIONS,
  mutations: MUTATIONS,
  getters: GETTERS,
  modules: {
    replies: REPLIES,
  },
};
