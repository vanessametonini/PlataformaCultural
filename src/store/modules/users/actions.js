import api from '../../../apiClient';

// import permissions from './Permissions';

const actions = {
  // OK
  signUp({ dispatch }, { credentials }) {
    dispatch('services/POST', { uri: 'signup', data: credentials }, { root: true })
      .then((response) => response)
      .catch((error) => error);
  },

  // Ok
  retrieveToken({ commit, dispatch }, { credentials }) {
    return new Promise((resolve, reject) => {
      dispatch('services/POST', { uri: 'signin', data: credentials }, { root: true })
        .then((response) => {
          commit('SET_AUTHENTICATION', {}, { root: true });
          commit('SET_CURRENT_USER', response.data);
          commit('services/STORAGE_TOKEN', response.data.token, { root: true });
          dispatch('pins/loadMyPin', {}, { root: true });
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  },

  loadCurrentUser({ commit, dispatch }, { id }) {
    return new Promise((resolve, reject) => {
      dispatch('services/GET', { uri: `users/${id}` }, { root: true })
        .then((response) => {
          commit('SET_CURRENT_USER', response.data[0]);
          dispatch('pins/loadMyPin', {}, { root: true });
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  },

  async loadUserId({ dispatch }, { id }) {
    return dispatch('services/GET', { uri: `users/${id}` }, { root: true })
      .then((response) => response.data)
      .catch((error) => error);
  },

  // IMPLEMENT REQUEST???
  destroyToken({ commit }) {
    localStorage.removeItem('access_token');
    commit('DESTROY_CURRENT_USER');
    commit('RESET_AUTHENTICATION', {}, { root: true });
  },

  // IMPLEMENT REQUEST - ADD TOKEN
  addPin({ commit }, { data }) {
    return new Promise((resolve, reject) => {
      api.post('/addNewPin', {
        title: data.title,
        category: data.category,
        email: data.email,
        phone: data.phone,
        street: data.street,
        neighborhood: data.neighborhood,
        zipcode: data.zipcode,
        number: data.number,
        city: data.city,
        imgUrl: data.imgUrl,
        content: data.content,
        linkF: data.linkF,
        linkIG: data.linkIG,
        otherLink: data.otherLink,
        userId: data.userId, // ONLY USERID OR USERREF {}  ??????
      },
      {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': authorization,
        },
      })
        .then((response) => {
          commit('ADD_PIN', response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // IMPLEMENT REQUEST - ADD TOKEN
  addNewEvent({ commit }, { data }) {
    return new Promise((resolve, reject) => {
      api.post('/addNewEvent', {
        title: data.title,
        userId: data.userId, // userId or userRef {} ????
        date: data.date,
        street: data.street,
        neighborhood: data.neighborhood,
        number: data.number,
        city: data.city,
        zipcode: data.zipcode,
        ticket: data.ticket,
        content: data.content,
        link: data.link,
        imgUrl: data.imgUrl,
      })
        .then((response) => {
          commit('ADD_EVENT', response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // IMPLEMENT REQUEST - ADD TOKEN
  likeReply({ state, commit, dispatch }, { replyId }) {
    // Promise((resolve, reject) => {
    //   api.post('/likeReply', {
    //     replyId,
    //     userId: state.currentUser.id,
    //   })
    //     .then((response) => {
    //       console.log('users/addLike');
    //       dispatch('topics/incrementLikeInReply', { replyId }, { root: true }); // call incrementLike on topicModule
    //       commit('ADD_LIKE', { response.data });
    //     })
    //     .catch((error) => {
    //       console.log(error.message);
    //       reject(error);
    //     });
    // });
    dispatch('setKey'); // TO BE DELETED
    const likeId = state.key; // TO BE DELETED
    const like = { likeId, replyId, userId: state.currentUser.id }; // TO BE DELETED
    commit('ADD_LIKE', { like }); // TO BE DELETED
  },

  // IMPLEMENT REQUEST - ADD TOKEN
  unlikeReply({ commit, dispatch }, { replyId }) {
    // Promise((resolve, reject) => {
    //   api.delete('/removeLikeInReply', {
    //     replyId,
    //   })
    //     .then(() => {
    //       console.log('users/removeLike');
    //       dispatch('topics/decrementLikeInReply', { replyId }, { root: true }); // call decrementLike on topicModule
    //       commit('REMOVE_LIKE', { replyId });
    //     })
    //     .catch((error) => {
    //       console.log(error.message);
    //       reject(error);
    //     });
    // });
    dispatch('topics/decrementLikeInReply', { replyId }, { root: true }); // call decrementLike on topicModule
    commit('REMOVE_LIKE', { replyId });
  },

  // IMPLEMENT REQUEST - ADD TOKEN - CONTINUE HERE
  supportThis({ dispatch, commit }, { topicId, supportType }) {
    const newSupport = { topicId, supportType }; // TO BE DELETED
    // Promise((resolve, reject) => {
    //   api.post('/supportTopic', {
    //     topicId,
    //     supportType,
    //     userId: state.currentUser.id,
    //   })
    //     .then((response) => {
    //       console.log('users/supportThis', topicId);
    //       dispatch('topics/supportCurrentTopic', response.data, { root: true });
    //       commit('ADD_SUPPORT', response.data);
    //     })
    //     .catch((error) => {
    //       console.log(error.message);
    //       reject(error);
    //     });
    // });
    dispatch('topics/supportCurrentTopic', { supportType }, { root: true }); // // TO BE DELETED
    commit('ADD_SUPPORT', newSupport); // // TO BE DELETED
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
