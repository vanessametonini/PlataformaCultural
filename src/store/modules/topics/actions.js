// import Vue from 'vue';
import api from '../../../apiClient';

const actions = {

  loadTopics({ dispatch, commit }) {
    dispatch('services/GET', { uri: 'topics' }, { root: true })
      .then((response) => {
        const topics = response.data;
        commit('SET_TOPICS_LIST', topics);
      })
      .catch((error) => error);
  },

  loadTopicId({ commit, dispatch }, { id }) {
    return dispatch('services/GET', { uri: `topics/${id}` }, { root: true })
      .then((response) => commit('SET_CURRENT_TOPIC', response.data))
      .catch((error) => error);
  },

  createNewTopic({
    commit,
    getters,
    dispatch,
    rootState,
    rootGetters,
  }) {
    const topic = {
      ...getters.topicForm,
      userId: rootState.users.currentUser.id,
      createdAt: rootGetters.date,
    };
    dispatch('services/POST', { uri: 'topics', data: { ...topic } }, { root: true })
      .then((response) => {
        commit('ADD_NEW_TOPIC', {
          ...topic,
          id: response.data[0],
          user: {
            ...rootState.users.currentUser,
            name: `${rootState.users.currentUser.firstName} ${rootState.users.currentUser.lastName}`,
          },
        });
      })
      .catch((error) => error);
  },

  loadInitialTopics({ commit }, { type, pagination }) {
    const loadFunc = new Promise((resolve, reject) => {
      api.get('/getInitialTopics', {
        params: {
          type,
          pagination,
        },
      })
        .then((response) => {
          commit('SET_TOPICS_LIST', response.data);
          resolve(response);
        })
        .catch((error) => reject(error));
    });
    loadFunc();
  },

  loadCurrentTopic({ commit }, { topicId }) {
    Promise((resolve, reject) => {
      api.get('/getCurrentTopic', {
        topicId,
      })
        .then((response) => {
          commit('SET_CURRENT_TOPIC', response.data);
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  },

  loadCurrentTopicReplyes({ commit }, { topicId }) {
    Promise((resolve, reject) => {
      api.get('/getCurrentTopicReplyes', {
        topicId,
      })
        .then((response) => {
          commit('SET_CURRENT_TOPIC_REPLYES', response.data);
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  },

  supportCurrentTopic({ commit }, { supportType }) {
    commit('ADD_SUPPORT', { supportType });
  },

  addReply({
    state,
    commit,
    dispatch,
    rootGetters,
  }, { data }) {
    dispatch('setKey');
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

  loadMoreTopics({ commit }, { type, pagination }) {
    Promise((resolve, reject) => {
      api.get('/getMoreTopics', {
        params: {
          type,
          pagination,
        },
      })
        .then((response) => {
          commit('SET_TOPICS_LIST', response.data);
          resolve(response);
        })
        .catch((error) => reject(error));
    });
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

  // OK
  setKey({ commit }) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 20; i += 1) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const key = autoId;
    commit('SET_KEY', { newKey: key });
  },
};

export default actions;
