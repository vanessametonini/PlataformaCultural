import api from '../../../apiClient';
// import permissions from './Permissions';

export default {
  namespaced: true,

  state: {
    key: null,
    currentUser: null,
    isAdmin: null,
    myPin: null,
    myEvents: null,
    repliesLiked: [],
    topicsSupported: [],
  },

  getters: {
    isLoggedIn(state) {
      const token = localStorage.getItem('access_token');
      return (state.currentUser !== null) && (token !== null);
      // return (token !== null);
    },
    isAdmin(state) {
      return (state.isAdmin !== null);
    },
    getMyPin: (state) => state.myPin,
    getMyPinState: (state) => state.myPin !== null,
    getMyEvents: (state) => state.myEvents,
    getMyLikes: (state) => state.repliesLiked,
    getMyVotes: (state) => state.topicsSupported,
    getUserReference(state) {
      const userRef = {
        id: state.currentUser.user.id,
        name: state.currentUser.user.firstName,
        categoryId: state.currentUser.user.categoryId,
        avatar: '',
      };
      return userRef;
    },

  },

  actions: {

    // OK
    signUp(context, { credentials }) {
      // console.log('context', context);
      return new Promise((resolve, reject) => {
        api.post('/signup', {
          firstName: credentials.firstName,
          lastName: credentials.lastName,
          email: credentials.email,
          password: credentials.password,
          confirmPassword: credentials.confirmPassword,
          isValid: true,
          isAdmin: false,
          categoryId: credentials.categoryId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            console.log('users/signUp - response', response.data);
            const message = 'Action Completed';
            resolve(response);
            return message;
          })
          .catch((error) => {
            console.log(error.message);
            reject(error);
          });
      });
    },

    // Ok
    retrieveToken({ commit }, { credentials }) {
      return new Promise((resolve, reject) => {
        api.post('/signin', {
          email: credentials.email,
          password: credentials.password,
        })
          .then((response) => {
            console.log('reponse LOGIN', response.data);
            // const { token } = response.data.token;
            // const { currentUser } = response.data;
            commit('SET_CURRENT_USER', response.data);
            localStorage.setItem('access_token', response.data.token);
            resolve(response);
          })
          .catch((error) => {
            console.log(error.message);
            reject(error);
          });
      });
    },

    loadCurrentUser({ state }) {
      return state.currentUser;
      // return new Promise((resolve, reject) => {
      //   api.post('/loadCurrentUser', {
      //     id: credentials.email,
      //     password: credentials.password,
      //   })
      //     .then((response) => {
      //       console.log('reponse LOGIN', response.data);
      //       // const { token } = response.data.token;
      //       // const { currentUser } = response.data;
      //       commit('SET_CURRENT_USER', response.data);
      //       localStorage.setItem('access_token', response.data.token);
      //       resolve(response);
      //     })
      //     .catch((error) => {
      //       console.log(error.message);
      //       reject(error);
      //     });
      // });
    },

    // IMPLEMENT REQUEST???
    destroyToken({ commit }) {
      localStorage.removeItem('access_token');
      commit('DESTROY_CURRENT_USER');
      console.log('logout');
    },

    // IMPLEMENT REQUEST - ADD TOKEN
    addPin({ commit }, { data }) {
      return new Promise((resolve, reject) => {
        console.log('users/addPin');
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
            console.log('users/addPin RESPONSE', response.data);
            commit('ADD_PIN', response.data);
            resolve(response);
          })
          .catch((error) => {
            console.log('users/addPin - ERROR', error.message);
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
            console.log('users/addNewEvent RESPONSE', response.data);
            commit('ADD_EVENT', response.data);
            resolve(response);
          })
          .catch((error) => {
            console.log('users/addNewEvent - ERROR', error.message);
            reject(error);
          });
      });
    },

    // IMPLEMENT REQUEST - ADD TOKEN
    likeReply({ state, commit, dispatch }, { replyId }) {
      console.log(state.currentUser.id); // TO BE DELETED
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
      console.log('users/addLike'); // TO BE DELETED
    },

    // IMPLEMENT REQUEST - ADD TOKEN
    unlikeReply({ state, commit, dispatch }, { replyId }) {
      console.log(state.currentUser.id); // TO BE DELETED
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
      console.log('users/unlikeLike');
    },

    // IMPLEMENT REQUEST - ADD TOKEN - CONTINUE HERE
    supportThis({ state, dispatch, commit }, { topicId, supportType }) {
      console.log('fake log', state.currentUser.id); // TO BE DELETED
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
      console.log('generated KEY', key);
      commit('SET_KEY', { newKey: key });
    },
  },

  mutations: {

    // OK
    SET_CURRENT_USER(state, user) {
      console.log('users/SET_CURRENT_USER', user);
      state.currentUser = user;
    },

    // OK
    DESTROY_CURRENT_USER(state) {
      state.currentUser = null;
      state.myEvents = null;
      state.myPin = null;
      state.isAdmin = null;
      console.log('mutation : destroy currentUser');
    },

    // TO BE REWIEWED
    ADD_PIN({ state }, { data }) {
      state.myPin = data;
      // state.currentUser.pinCompleted = true; CHECK???
      console.log('users/ADD_PIN', state.myPin);
    },

    // TO BE REWIEWED
    ADD_EVENT({ state }, { data }) {
      console.log('users/ADD_EVENT', data);
      state.myEvents.push(data);
    },

    // TO BE REWIEWED
    ADD_SUPPORT(state, newSupport) {
      console.log('users/ADD_SUPPORT', newSupport);
      state.topicsSupported.push(newSupport);
    },

    // TEST WITH OBJECT IMPLEMENTATION - NEED DOC { likeId, replyId, userId }
    ADD_LIKE(state, { like }) {
      state.repliesLiked.push(like);
      // console.log('array mylikes', state.repliesLiked);
    },

    // TEST WITH OBJECT IMPLEMENTATION
    REMOVE_LIKE(state, { replyId }) {
      const index = state.repliesLiked.findIndex((el) => el.replyId === replyId);
      if (state.repliesLiked !== null && state.repliesLiked.length !== 0) {
        state.repliesLiked.splice(index, 1);
        // console.log('array mylikes after remove', state.repliesLiked);
      }
    },
  },
};
