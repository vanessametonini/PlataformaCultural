import { updateField } from 'vuex-map-fields';

const mutations = {
  // OK
  SET_CURRENT_TOPIC_REJOINDERS(state, data) {
    state.currentTopicRejoinders = data;
  },

  updateField,
};

export default mutations;
