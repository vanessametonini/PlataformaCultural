const state = {
  search: '',
  list: [],
  key: null,
  topicForm: {
    title: '',
    categoryId: null,
    categoriesTagged: [],
    userId: null,
    createdAt: '',
    positiveSupports: 0,
    negativeSupports: 0,
    numberOfReplies: 0,
    content: '',
    views: 0,
  },
  currentTopic: null,
  currentFilter: 'mostRecent',
  streamAmount: 12, // number of topics required in request
  currentTopicReplies: [],
};

export default state;
