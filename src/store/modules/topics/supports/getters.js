const GETTERS = {
  getCurrentTopicSupports: (state) => state.currentTopicSupports,
  getInfoCurrentTopicSupports: (state) => {
    const positiveSupports = state.currentTopicSupports
      .map((support) => support.status)
      .reduce((a, b) => a + b, 0);
    const negativeSupports = state.currentTopicSupports.length - positiveSupports;
    return {
      positiveSupports,
      negativeSupports,
    };
  },
  getMyVoteCurrentTopic: (state, getters, rootState, rootGetters) => {
    const hasBeen = state.currentTopicSupports
      .map((support) => support.userId === rootGetters['users/getCurrentUser'].id)
      .reduce((a, b) => a + b, 0) > 0;
    const mysupport = state.currentTopicSupports
      .filter((support) => support.userId === rootGetters['users/getCurrentUser'].id)[0];
    return {
      hasBeen,
      status: mysupport?.status,
    };
  },
};

export default GETTERS;
