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
  getMyVoteCurrentTopic: (state, getters, rootState) => {
    const hasBeen = state.currentTopicSupports
      .map((support) => support.userId === rootState.users.currentUser.id)
      .reduce((a, b) => a + b, 0) === 1;
    const mysupport = state.currentTopicSupports
      .filter((support) => support.userId === rootState.users.currentUser.id)[0];
    return {
      hasBeen,
      status: mysupport?.status,
    };
  },
};

export default GETTERS;
