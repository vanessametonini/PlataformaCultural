const mutations = {
  // OK
  SET_TOPICS_LIST(state, list) {
    state.list = list;
  },

  // OK
  SET_CURRENT_TOPIC(state, data) {
    state.currentTopic = data;
  },

  // OK
  SET_CURRENT_TOPIC_REPLYES(state, data) {
    state.currentTopicReplies = data;
  },

  // TO BE REWIEWED
  ADD_NEW_TOPIC(state, { data }) {
    state.list.push(data);
  },

  // TO BE REWIEWED
  ADD_SUPPORT(state, { supportType }) {
    if (supportType) {
      // approved
      state.currentTopic.positiveSupports += 1;
    } else {
      // not approved
      state.currentTopic.negativeSupports += 1;
    }
  },

  // NO CALLED
  POSITIVE_SUPPORT_DECREMENT(state) {
    state.currentTopic.positiveSupports -= 1;
  },

  // NO CALLED
  NEGATIVE_SUPPORT_DECREMENT(state) {
    state.currentTopic.negativeSupports -= 1;
  },

  // OK
  ADD_REPLY_TO_CURRENT_TOPIC(state, data) {
    console.log('ADD_REPLY_TO_CURRENT_TOPIC', data);
    // state.currentTopicReplies.push(data);
    state.replies.push(data); // TO BE DELETED
  },

  // Ok
  DELETE_REPLY(state, { replyId }) {
    console.log('topics/DELETE_REPLY', replyId);
    // const replyIndex = state.currentTopicReplies.findIndex((reply) => reply.id === replyId);
    // state.currentTopicReplies.splice(replyIndex, 1);
    const replyIndex = state.replies.findIndex((reply) => reply.id === replyId); // TO BE DELETED
    state.replies.splice(replyIndex, 1); // TO BE DELETED
  },

  // TO BE IMPLEMENTED
  UPDATE_REPLY(state, { replyId, data }) {
    // const replyIndex = state.currentTopicReplies.findIndex((reply) => reply.id === replyId);
    // state.currentTopicReplies[replyIndex].content = data;
    const replyIndex = state.replies.findIndex((reply) => reply.id === replyId); // TO BE DELETED
    state.replies[replyIndex].content = data; // TO BE DELETED
  },

  // OK
  INCREMENT_LIKE_IN_REPLY(state, { replyId }) {
    const replyIndex = state.currentTopicReplies.findIndex((reply) => reply.id === replyId);
    state.currentTopicReplies[replyIndex].numberOfLikes += 1;
  },

  // OK
  DECREMENT_LIKE_IN_REPLY(state, { replyId }) {
    const replyIndex = state.currentTopicReplies.findIndex((reply) => reply.id === replyId);
    state.currentTopicReplies[replyIndex].numberOfLikes -= 1;
  },

  // OK
  SET_KEY(state, { newKey }) {
    state.key = newKey;
    console.log('topics/setKey', newKey);
  },
};

export default mutations;
