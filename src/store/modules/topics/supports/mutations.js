const mutations = {
  SET_CURRENT_TOPIC_SUPPORTS(state, data) {
    state.currentTopicSupports = data;
  },
  ADD_CURRENT_TOPIC_SUPPORT(state, data) {
    state.currentTopicSupports.push(data);
  },
};

export default mutations;
