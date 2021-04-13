const actions = {

  loadRejoindersByTopicId({ commit, dispatch, rootState }) {
    dispatch('services/GET', { uri: `rejoinders/topic/${rootState.topics.currentTopic.id}` }, { root: true })
      .then(async (response) => {
        const rejoindersArray = response.data.map((rejoinder) => {
          return dispatch('services/GET', { uri: `users/${rejoinder.userId}` }, { root: true })
            .then((response) => {
              return {
                ...rejoinder,
                user: response.data,
              }
            })
        });
        const rejoinders = await Promise.all(rejoindersArray);

        commit('SET_CURRENT_TOPIC_REJOINDERS', rejoinders);
        return rejoinders;
      })
      .catch((error) => error);
  },

  SOCKET_newRejoinderToClient({ commit, rootGetters }, rejoinder) {
    if (rootGetters['topics/getCurrentTopic']?.id === rejoinder.topicId){ 
      commit('ADD_CURRENT_TOPIC_REPLY_REJOINDER', rejoinder);
    }
    commit('topics/INCREMENT_TOPIC_LIST_REPLY', rejoinder.topicId, { root: true });
  },

  addRejoinder: ({ rootState }, { data, $socket }) => $socket.emit('newRejoinderToServer', {
      replyId: data.replyId,
      topicId: rootState.topics.currentTopic.id,
      userId: rootState.users.currentUser.id,
      content: data.content,
      createdAt: new Date(),
    })
};
 // dispatch('services/POST', { uri: 'rejoinders', data: { ...rejoinder } }, { root: true })
    //   .then((response) => commit('ADD_CURRENT_TOPIC_REPLY_REJOINDER', {
    //     ...{ id: response.data[0] },
    //     ...rejoinder,
    //     user: {
    //       ...rootState.users.currentUser,
    //       name: `${rootState.users.currentUser.firstName} ${rootState.users.currentUser.lastName}`,
    //     },
    //   })).catch((error) => error);
export default actions;
