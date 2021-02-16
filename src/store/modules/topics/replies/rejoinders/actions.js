const actions = {

  loadRejoindersByTopicId({ commit, dispatch, rootState }) {
    dispatch('services/GET', { uri: `rejoinders/${rootState.topics.currentTopic.id}` }, { root: true })
      .then((response) => {
        commit('SET_CURRENT_TOPIC_REJOINDERS', response.data);
        return response.data;
      })
      .catch((error) => error);
  },

  addRejoinder({
    commit,
    dispatch,
    rootState,
    rootGetters,
  }, { data }) {
    const rejoinder = {
      replyId: data.replyId,
      topicId: rootState.topics.currentTopic.id,
      userId: rootState.users.currentUser.id,
      content: data.content,
      createdAt: rootGetters.date,
    };
    console.log(rejoinder);
    dispatch('services/POST', { uri: 'rejoinders', data: { ...rejoinder } }, { root: true })
      .then((response) => commit('ADD_CURRENT_TOPIC_REPLY_REJOINDER', {
        ...{ id: response.data },
        ...rejoinder,
        user: {
          ...rootState.users.currentUser,
          name: `${rootState.users.currentUser.firstName} ${rootState.users.currentUser.lastName}`,
        },
      })).catch((error) => error);
  },
};

export default actions;
