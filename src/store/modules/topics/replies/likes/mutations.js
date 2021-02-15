const mutations = {
  SET_CURRENT_TOPIC_LIKES(state, data) {
    state.currentTopicRepliesLikes = data;
  },
  ADD_CURRENT_TOPIC_REPLY_LIKE(state, data) {
    state.currentTopicRepliesLikes.push(data);
  },
  REMOVE_LIKE_ID(state, likeId) {
    state.currentTopicRepliesLikes = state.currentTopicRepliesLikes.filter((like) => !(like.id === likeId));
  },
};

export default mutations;
