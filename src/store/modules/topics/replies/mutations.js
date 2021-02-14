import { updateField } from 'vuex-map-fields';

const mutations = {
  // OK
  SET_CURRENT_TOPIC_REPLYES(state, data) {
    state.currentTopicReplies = data;
  },

  ADD_CURRENT_TOPIC_REPLY(state, data) {
    state.currentTopicReplies.push(data);
  },

  updateField,
};

export default mutations;
