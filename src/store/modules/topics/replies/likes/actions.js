const actions = {

  SOCKET_newLikeToClient({ commit, rootGetters }, like) {
    if (rootGetters['topics/getCurrentTopic']?.id === like.topicId) {
      commit('ADD_CURRENT_TOPIC_REPLY_LIKE', like);
    }
  },

  createLike: ({ rootState }, { replyId, $socket }) => $socket.emit('newLikeToServer', {
      userId: rootState.users.currentUser.id,
      topicId: rootState.topics.currentTopic.id,
      replyId,
      createdAt: new Date(),
    }),

  SOCKET_removeLikeToClient({ commit, rootGetters }, like) {
    if (rootGetters['topics/getCurrentTopic']?.id === like.topicId) {
      commit('REMOVE_LIKE_ID', like.id)
    }
  },

  removeLike: ({ getters }, { replyId, $socket }) => $socket.emit('removeLikeToServer', { id:  getters.getMyLikeId(replyId) }),


  loadLikesByTopicId({ commit, dispatch, rootState }) {
    dispatch('services/GET', { uri: `likes/topic/${rootState.topics.currentTopic.id}` }, { root: true })
      .then((response) => {
        commit('SET_CURRENT_TOPIC_LIKES', response.data);
        return response.data;
      })
      .catch((error) => error);
  },
};

export default actions;
