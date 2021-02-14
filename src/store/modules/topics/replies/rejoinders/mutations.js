import { updateField } from 'vuex-map-fields';

const mutations = {
  // OK
  SET_CURRENT_TOPIC_REPLYES(state, data) {
    state.currentTopicReplies = data;
  },

  updateField,
};

export default mutations;
