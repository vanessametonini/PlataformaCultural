const actions = {

  loadRejoindersByTopicId({ commit, dispatch, rootState }) {
    dispatch('services/GET', { uri: `replies/rejoinders/${rootState.topics.currentTopic.id}` }, { root: true })
      .then((response) => {
        commit('SET_CURRENT_TOPIC_REJOINDERS', response.data);
        return response.data;
      })
      .catch((error) => error);
  },

  addRejoinder({
    getters,
    commit,
    dispatch,
    rootState,
  }) {
    const data = { ...getters.getCurrentReply };
    dispatch('services/POST', { uri: 'rejoinders', data }, { root: true })
      .then((response) => commit('ADD_CURRENT_TOPIC_REJOINDER', {
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
