const actions = {
  async loadRepliesByTopicId({ commit, dispatch, rootState }) {
    dispatch('services/GET', { uri: `replies/topic/${rootState.topics.currentTopic.id}` }, { root: true })
      .then(async (response) => {
        const repliesArray = response.data.map((reply) => {
          return dispatch('services/GET', { uri: `users/${reply.userId}` }, { root: true })
            .then((response) => {
              return {
                ...reply,
                user: response.data,
              }
            })
        });
        const replies = await Promise.all(repliesArray);
        commit('SET_CURRENT_TOPIC_REPLYES', replies);
        commit('rejoinders/INIT_CURRENT_TOPIC_REJOINDERS_FORM', replies);
        return replies;
      })
      .catch((error) => error);
  },

  SOCKET_newReplyToClient({ commit }, reply) {
    commit('topics/INCREMENT_TOPIC_LIST_REPLY', reply, { root: true });
    commit('rejoinders/ADD_CURRENT_TOPIC_REPLY_REJOINDER_FORM', {
      replyId: reply.id,
      content: '',
    });
    commit('ADD_CURRENT_TOPIC_REPLY', reply);
  },
  
  addReply({ getters }, { $socket }) {
    $socket.emit('newReplyToServer', { ...getters.getCurrentReply } );
  },
};

export default actions;
