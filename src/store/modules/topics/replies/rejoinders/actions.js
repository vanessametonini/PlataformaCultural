const actions = {

  loadRepliesByTopicId({ commit, dispatch, rootState }) {
    dispatch('services/GET', { uri: `replies/rejoinders/${rootState.topics.currentTopic.id}` }, { root: true })
      .then((response) => {
        commit('SET_CURRENT_TOPIC_REJOINDERS', response.data);
        return response.data;
      })
      .catch((error) => error);
  },
};

export default actions;
