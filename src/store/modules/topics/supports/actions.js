const actions = {

  loadSupportsByTopicId({ commit, dispatch, rootState }) {
    dispatch('services/GET', { uri: `supports/${rootState.topics.currentTopic.id}` }, { root: true })
      .then((response) => {
        commit('SET_CURRENT_TOPIC_SUPPORTS', response.data);
        return response.data;
      })
      .catch((error) => error);
  },
};

export default actions;
