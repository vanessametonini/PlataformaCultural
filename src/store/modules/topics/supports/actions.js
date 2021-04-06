const actions = {

  supportCurrentTopic({
    commit,
    dispatch,
    rootState,
    rootGetters,
  }, { supportType }) {
    const support = {
      topicId: rootState.topics.currentTopic.id,
      userId: rootState.users.currentUser.id,
      status: supportType,
      createdAt: rootGetters.date,
    };
    dispatch('services/POST', { uri: 'supports', data: support }, { root: true })
      .then((response) => {
        console.log(response);
        commit('ADD_CURRENT_TOPIC_SUPPORT', { id: response.data, ...support });
        commit('topics/INCREMENT_TOPIC_LIST_SUPPORT', support, { root: true });
        return response.data;
      })
      .catch((error) => error);
  },
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
