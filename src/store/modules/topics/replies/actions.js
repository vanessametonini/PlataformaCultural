const actions = {
  loadRepliesByTopicId({ commit, dispatch, rootState }) {
    dispatch('services/GET', { uri: `replies/${rootState.topics.currentTopic.id}` }, { root: true })
      .then((response) => {
        commit('SET_CURRENT_TOPIC_REPLYES', response.data);
        return response.data;
      })
      .catch((error) => error);
  },
  addReply({
    getters,
    commit,
    dispatch,
    rootState,
  }) {
    const data = { ...getters.getCurrentReply };
    dispatch('services/POST', { uri: 'replies', data }, { root: true })
      .then((response) => commit('ADD_CURRENT_TOPIC_REPLY', {
        ...{ id: response.data.id },
        ...data,
        user: {
          ...rootState.users.currentUser,
          name: `${rootState.users.currentUser.firstName} ${rootState.users.currentUser.lastName}`,
        },
      })).catch((error) => error);
  },
};

export default actions;
