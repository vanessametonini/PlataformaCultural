const actions = {

  SOCKET_newSupportToClient({ state, commit, rootGetters }, support) {
    if (rootGetters['topics/getCurrentTopic']?.id === support.topicId)
      state.currentTopicSupports.push(support);
    commit('topics/INCREMENT_TOPIC_LIST_SUPPORT', support, { root: true });
  },

  supportCurrentTopic: ({ rootState }, { supportType, $socket }) =>
    $socket.emit('newSupportToServer', {
      topicId: rootState.topics.currentTopic.id,
      userId: rootState.users.currentUser.id,
      status: supportType,
      createdAt: new Date(),
    }),
    
  loadSupportsByTopicId({ commit, dispatch, rootState }) {
    dispatch('services/GET', { uri: `supports/topics/${rootState.topics.currentTopic.id}` }, { root: true })
      .then((response) => {
        commit('SET_CURRENT_TOPIC_SUPPORTS', response.data);
        return response.data;
      })
      .catch((error) => error);
  },
};

export default actions;
