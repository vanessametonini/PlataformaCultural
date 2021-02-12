const getters = {
  loadTopics: (state) => state.list,
  getCurrentTopic: (state) => state.currentTopic,
  getCurrentTopicReplyes: (state) => state.currentTopicReplies,
};

export default getters;
