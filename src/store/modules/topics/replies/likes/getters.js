const GETTERS = {
  getCurrentTopicLikes: (state) => state.currentTopicRepliesLikes,
  getNumberOfReplyLikes: (state) => (replyId) => state.currentTopicRepliesLikes
    .map((like) => like.replyId === replyId)
    .reduce((a, b) => a + b, 0),
  getMyLikeCurrentTopicByReplyId: (state, getters, rootState) => (replyId) => state.currentTopicRepliesLikes.filter((like) => like.replyId === replyId
    && like.userId === rootState.users.currentUser.id),
  getMyLikeId: (state, getters, rootState) => (replyId) => {
    const myLike = state.currentTopicRepliesLikes.filter((like) => like.replyId === replyId
    && like.userId === rootState.users.currentUser.id);
    return myLike[0].id;
  },
};

export default GETTERS;
