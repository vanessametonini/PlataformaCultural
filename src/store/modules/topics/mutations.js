import { updateField } from 'vuex-map-fields';

const mutations = {
  SET_TOPICS_LIST(state, list) {
    state.list = list;
  },

  SET_CURRENT_TOPIC(state, data) {
    state.currentTopic = data;
  },

  SET_CURRENT_TOPIC_REPLYES(state, data) {
    state.currentTopicReplies = data;
  },

  ADD_NEW_TOPIC(state, data) {
    state.list.push(data);
  },

  ADD_SUPPORT(state, { supportType }) {
    if (supportType) {
      state.currentTopic.positiveSupports += 1;
    } else {
      state.currentTopic.negativeSupports += 1;
    }
  },

  POSITIVE_SUPPORT_DECREMENT(state) {
    state.currentTopic.positiveSupports -= 1;
  },

  NEGATIVE_SUPPORT_DECREMENT(state) {
    state.currentTopic.negativeSupports -= 1;
  },

  ADD_REPLY_TO_CURRENT_TOPIC(state, data) {
    console.log('ADD_REPLY_TO_CURRENT_TOPIC', data);
    state.replies.push(data);
  },

  DELETE_REPLY(state, { replyId }) {
    console.log('topics/DELETE_REPLY', replyId);
    const replyIndex = state.replies.findIndex((reply) => reply.id === replyId);
    state.replies.splice(replyIndex, 1);
  },

  UPDATE_REPLY(state, { replyId, data }) {
    const replyIndex = state.replies.findIndex((reply) => reply.id === replyId);
    state.replies[replyIndex].content = data;
  },

  INCREMENT_LIKE_IN_REPLY(state, { replyId }) {
    const replyIndex = state.currentTopicReplies.findIndex((reply) => reply.id === replyId);
    state.currentTopicReplies[replyIndex].numberOfLikes += 1;
  },

  DECREMENT_LIKE_IN_REPLY(state, { replyId }) {
    const replyIndex = state.currentTopicReplies.findIndex((reply) => reply.id === replyId);
    state.currentTopicReplies[replyIndex].numberOfLikes -= 1;
  },

  SET_KEY(state, { newKey }) {
    state.key = newKey;
    console.log('topics/setKey', newKey);
  },

  updateField,
};

export default mutations;
