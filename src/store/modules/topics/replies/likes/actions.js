import { Notify } from 'quasar';

const actions = {

  SOCKET_newLikeToClient({ commit, rootGetters }, like) {
    console.log(like);
    if (rootGetters['topics/getCurrentTopic']?.id === like.topicId) {
      commit('ADD_CURRENT_TOPIC_REPLY_LIKE', like);
    }
    let message =  'default';

    const userLocal = rootGetters['users/getCurrentUser'];

    if((like.userLiked.id===like.user.id) && (userLocal.id!==like.user.id)){
      message = `${like.user.firstName} curtiu um comentário próprio`;
    }
    if((userLocal.id===like.user.id) && (userLocal.id===like.userLiked.id)){
      message = `Você curtiu um comentário próprio`;
    }
    if((userLocal.id===like.user.id) && (userLocal.id!==like.userLiked.id)){
      message = `Você curtiu um comentário de ${like.userLiked.firstName}`;
    }
    if((userLocal.id!==like.user.id) && (userLocal.id===like.userLiked.id)){
      message = `${like.user.firstName} curtiu seu comentário`;
    }
    if((like.userLiked.id!==like.user.id) && (userLocal.id!==like.user.id) && (userLocal.id!==like.userLiked.id)){
      message = `${like.user.firstName} curtiu um comentário de ${like.userLiked.firstName}`;
    }

    Notify.create({
      color: 'black',
      textColor: 'white',
      message,
      position: 'bottom-right',
    })

  },

  createLike({ rootGetters }, { replyId, $socket }) {
    const reply = rootGetters['topics/replies/getCurrentTopicReplyById'](replyId);
    console.log(reply);
    // const currentTopic = rootGetters['topics/getCurrentTopic'];
    const currentUser = rootGetters['users/getCurrentUser'];
    const { 
      id,
      firstName, 
      lastName,
      avatarId
    } = reply.user;
    $socket.emit('newLikeToServer', {
      userId: currentUser.id,
      topicId: reply.topicId,
      replyId,
      user:{
        id: currentUser.id,
        firstName: currentUser.firstName, 
        lastName: currentUser.lastName,
        avatarId: currentUser.avatarId
      },
      userLiked:{
        id,
        firstName, 
        lastName,
        avatarId
      },
      createdAt: new Date(),
    })
  },

  SOCKET_removeLikeToClient({ commit, rootGetters }, like) {
    if (rootGetters['topics/getCurrentTopic']?.id === like.topicId) {
      commit('REMOVE_LIKE_ID', like.id)
    }
  },

  removeLike: ({ getters }, { replyId, $socket }) => $socket.emit('removeLikeToServer', { id:  getters.getMyLikeId(replyId) }),


  loadLikesByTopicId({ commit, dispatch, rootState }) {
    dispatch('services/GET', { uri: `likes/topic/${rootState.topics.currentTopic.id}` }, { root: true })
      .then((response) => {
        commit('SET_CURRENT_TOPIC_LIKES', response.data);
        return response.data;
      })
      .catch((error) => error);
  },
};

export default actions;
