import { Notify } from 'quasar';

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

    let message = 'default';

    const userLocal = rootGetters['users/getCurrentUser'];

    if ((rejoinder.userCommented.id === rejoinder.user.id) && (userLocal.id !== rejoinder.user.id)) {
      message = `${rejoinder.user.firstName} respondeu um comentário próprio`;
    }
    if ((userLocal.id === rejoinder.user.id) && (userLocal.id === rejoinder.userCommented.id)) {
      message = `Você respondeu um comentário próprio`;
    }
    if ((userLocal.id === rejoinder.user.id) && (userLocal.id !== rejoinder.userCommented.id)) {
      message = `Você respondeu um comentário de ${rejoinder.userCommented.firstName}`;
    }
    if ((userLocal.id !== rejoinder.user.id) && (userLocal.id === rejoinder.userCommented.id)) {
      message = `${rejoinder.user.firstName} respondeu seu comentário`;
    }
    if ((rejoinder.userCommented.id !== rejoinder.user.id) && (userLocal.id !== rejoinder.user.id) && (userLocal.id !== rejoinder.userCommented.id)) {
      message = `${rejoinder.user.firstName} respondeu um comentário de ${rejoinder.userCommented.firstName}`;
    }

    Notify.create({
      color: 'black',
      textColor: 'white',
      message,
      position: 'bottom-right',
    })
  },

  addRejoinder({ rootState, rootGetters }, { rejoinder, reply, $socket }) {
    const currentUser = rootGetters['users/getCurrentUser'];
    const {
      id,
      firstName,
      lastName,
      avatarId
    } = reply.user;
    $socket.emit('newRejoinderToServer', {
      replyId: rejoinder.replyId,
      topicId: rootState.topics.currentTopic.id,
      userId: currentUser.id,
      user: {
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        avatarId: currentUser.avatarId
      },
      userCommented: {
        id,
        firstName,
        lastName,
        avatarId
      },
      content: rejoinder.content,
      createdAt: new Date(), 
    })
  }
};
export default actions;
