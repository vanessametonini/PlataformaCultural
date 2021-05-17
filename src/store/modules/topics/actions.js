import api from '../../../apiClient';

const actions = {

  loadTopics({ dispatch, commit }) {
    dispatch('services/GET', { uri: 'topics' }, { root: true })
      .then(async (response) => {
        const topicsArray = response.data.map((topic) => {
          return dispatch('services/GET', { uri: `users/${topic.userId}` }, { root: true })
            .then((response) => {
              return {
                ...topic,
                user: response.data,
              }
            })
        });
        const topics = await Promise.all(topicsArray);
        commit('SET_TOPICS_LIST', topics);
      })
      .catch((error) => error);
  },

  loadTopicId({ commit, dispatch }, { id }) {
    return dispatch('services/GET', { uri: `topics/${id}` }, { root: true })
      .then((response) => commit('SET_CURRENT_TOPIC', response.data))
      .catch((error) => error);
  },

  SOCKET_newTopicToClient({ state, commit }, topic) {
    commit('ADD_NEW_TOPIC', topic, { root: true });
  },

  createNewTopic: ({ getters, rootGetters }, { $socket }) =>
    $socket.emit('newTopicToServer', {
      ...getters.topicForm,
      userId: rootGetters['users/getCurrentUser'].id,
      createdAt: new Date(),
  }),

  supportCurrentTopic({ commit }, { supportType }) {
    commit('ADD_SUPPORT', { supportType });
  },

  addReply({
    state,
    commit,
    dispatch,
    rootGetters,
  }, { data }) {
    const replyId = state.key;
    const userRef = rootGetters['users/getUserReference'];
    const today = new Date();
    const date = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
    const newReply = {
      id: replyId,
      topicId: state.currentTopic.id,
      user: userRef,
      replyTag: data.replyTag,
      content: data.content,
      createdAt: date,
      numberOfLikes: 0,
    };
    commit('ADD_REPLY_TO_CURRENT_TOPIC', newReply);
  },

  deleteReply({ commit }, { replyId }) {
    commit('DELETE_REPLY', { replyId });
  },

  updateReply({ commit }, { replyId, data }) {
    commit('UPDATE_REPLY', { replyId, data });
  },

  incrementLikeInReply({ commit }, { replyId }) {
    commit('INCREMENT_LIKE_IN_REPLY', { replyId });
  },

  decrementLikeInReply({ commit }, { replyId }) {
    commit('DECREMENT_LIKE_IN_REPLY', { replyId });
  },

  getReplyTag({ state }, { replyTagId }) {
    const data = state.currentTopicReplies.find((el) => el.id === replyTagId);
    return data;
  },
};

export default actions;
