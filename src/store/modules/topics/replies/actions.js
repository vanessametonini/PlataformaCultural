import { Notify } from 'quasar';

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

  SOCKET_newReplyToClient({ commit, rootGetters }, reply) {
    if (rootGetters['topics/getCurrentTopic']?.id === reply.topicId){
      commit('ADD_CURRENT_TOPIC_REPLY', reply);
      commit('rejoinders/ADD_CURRENT_TOPIC_REPLY_REJOINDER_FORM', {
        replyId: reply.id, 
        content: '',
      });
    }
    commit('topics/INCREMENT_TOPIC_LIST_REPLY', reply.topicId, { root: true });
    Notify.create({
      color: 'black',
      textColor: 'white',
      message: `${(rootGetters['users/getCurrentUser'].id===reply.user.id)?'Você':reply.user.firstName} comentou`,
      position: 'bottom-right',
    })
  },
  
  addReply: ({ getters }, { $socket }) => $socket.emit('newReplyToServer', { ...getters.getCurrentReply } ),

  SOCKET_deleteReplyToClient({ commit, rootGetters }, reply) {
    if (rootGetters['topics/getCurrentTopic']?.id === reply.topicId){
      commit('DEL_CURRENT_TOPIC_REPLY', reply.id);
    }
    commit('topics/DECREMENT_TOPIC_LIST_REPLY', reply.topicId, { root: true });
    Notify.create({
      color: 'black',
      textColor: 'white',
      message: `${(rootGetters['users/getCurrentUser'].id===reply.user.id)?'Você':reply.user.firstName} excluiu um comentário`,
      position: 'bottom-right',
    })
  },

  deleteReply({}, { reply, $socket }){
    $socket.emit('deleteReplyToServer', reply )
  }
};

export default actions;
