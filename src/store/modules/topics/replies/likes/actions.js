const actions = {

  createLike({
    commit,
    dispatch,
    rootState,
    rootGetters,
  }, { replyId }) {
    const info = {
      userId: rootState.users.currentUser.id,
      topicId: rootState.topics.currentTopic.id,
      replyId,
      createdAt: rootGetters.date,
    };
    dispatch('services/POST', { uri: 'likes', data: { ...info } }, { root: true })
      .then((response) => {
        commit('ADD_CURRENT_TOPIC_REPLY_LIKE', { id: response.data.id, ...info });
      })
      .catch((error) => console.log(error.message));
  },
  removeLike({ commit, getters, dispatch }, { replyId }) {
    const likeId = getters.getMyLikeId(replyId);
    dispatch('services/DELETE', { uri: `likes/${likeId}` }, { root: true })
      .then(() => commit('REMOVE_LIKE_ID', likeId))
      .catch((error) => console.log(error.message));
  },
  loadLikesByTopicId({ commit, dispatch, rootState }) {
    dispatch('services/GET', { uri: `likes/${rootState.topics.currentTopic.id}` }, { root: true })
      .then((response) => {
        commit('SET_CURRENT_TOPIC_LIKES', response.data);
        return response.data;
      })
      .catch((error) => error);
  },
};

export default actions;
