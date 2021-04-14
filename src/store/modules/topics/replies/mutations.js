import { updateField } from 'vuex-map-fields';

const mutations = {
  // OK
  SET_CURRENT_TOPIC_REPLYES(state, data) {
    state.currentTopicReplies = data;
  },

  ADD_CURRENT_TOPIC_REPLY(state, data) {
    state.currentTopicReplies.push(data);
  },
  DEL_CURRENT_TOPIC_REPLY(state, replyId) {
    state.currentTopicReplies = state.currentTopicReplies.filter((reply) => reply.id !== replyId );
  },

  updateField,
};

export default mutations;
