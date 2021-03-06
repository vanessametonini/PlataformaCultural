import { getField } from 'vuex-map-fields';

const GETTERS = {
  getCurrentTopicReplyes: (state) => state.currentTopicReplies,
  getCurrentReply(state, getters, rootState, rootGetters) {
    const reply = { ...state.replieForm };
    reply.topicId = rootState.topics.currentTopic.id;
    reply.userId = rootState.users.currentUser.id;
    reply.numberOfLikes = 0;
    reply.createdAt = new Date();
    return reply;
  },
  getField,
  getCurrentTopicReplyById: (state) => (replyId) => {
    return state.currentTopicReplies.filter((reply) => reply.id === replyId )[0]
  }
};

export default GETTERS;
