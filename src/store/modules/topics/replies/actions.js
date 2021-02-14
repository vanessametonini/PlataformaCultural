const actions = {

  loadRepliesByTopicId({ commit, dispatch, rootState }) {
    dispatch('services/GET', { uri: `replies/${rootState.topics.currentTopic.id}` }, { root: true })
      .then((response) => {
        commit('SET_CURRENT_TOPIC_REPLYES', response.data);
        return response.data;
      })
      .catch((error) => error);
  },
};

export default actions;
