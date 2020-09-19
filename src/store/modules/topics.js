// import Vue from 'vue';
import api from '../../apiClient';

export default {
  namespaced: true,

  state: {
    list: [
      // OBJECT REFERENCE ----  TO BE DELETED
      {
        id: 1,
        title: 'Dance Fest',
        topicCategory: 1,
        categoriesTagged: 1,
        user: {
          name: 'jão', // implement user name
          id: 12,
        },
        createdAt: '2020/04/28', // implements full date, with time too mm dd yyyy HH:MM:SS timezone
        content: 'pula fogueira Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográplesmente uma simulação de texto da indústria tipográfica ede impressos,',
        positiveSupports: 170,
        negativeSupports: 65,
        numberOfReplies: 2,
        views: 0,
      },
    ],
    replies: [
      {
        id: 1,
        topicId: 1,
        user: {
          id: 2,
          name: 'Juliana Trujillo',
          categoryId: 8,
          avatar: '',
        },
        replyTag: null,
        content: 'Expedita aliquid at suscipit molestias eos dicta, sed iste quidem blanditiis quod.',
        createdAt: '2019-03-27',
        numberOfLikes: 12,
      },
      {
        id: 2,
        topicId: 1,
        user: {
          id: 27,
          name: 'Henrique Leonel',
          categoryId: 15,
          avatar: '',
        },
        replyTag: null,
        content: 'Aperiam minima autem aliquam alias consequuntur quas magnam?',
        createdAt: '2019-03-27',
        numberOfLikes: 0,
      },
      {
        id: 3,
        topicId: 3,
        user: {
          id: 2,
          name: 'Juliana Trujillo',
          categoryId: 8,
          avatar: '',
        },
        replyTag: null,
        content: 'Expedita aliquid at suscipit molestias eos dicta, sed iste quidem blanditiis quod.',
        createdAt: '2019-03-27',
        numberOfLikes: 12,
      },
      {
        id: 4,
        topicId: 3,
        user: {
          id: 27,
          name: 'Henrique Leonel',
          categoryId: 15,
          avatar: '',
        },
        replyTag: null,
        content: 'Aperiam minima autem aliquam alias consequuntur quas magnam?',
        createdAt: '2019-03-27',
        numberOfLikes: 0,
      },
      {
        id: 5,
        topicId: 3,
        user: {
          id: 2,
          name: 'Juliana Trujillo',
          categoryId: 8,
          avatar: '',
        },
        replyTag: null,
        content: 'Expedita aliquid at suscipit molestias eos dicta, sed iste quidem blanditiis quod.',
        createdAt: '2019-03-27',
        numberOfLikes: 12,
      },
      {
        id: 6,
        topicId: 3,
        user: {
          id: 43,
          name: 'fulano',
          categoryId: 15,
          avatar: '',
        },
        replyTag: 5,
        content: 'Aperiam minima autem aliquam alias consequuntur quas magnam?',
        createdAt: '2019-03-27',
        numberOfLikes: 3,
      },
    ],
    key: null,
    currentTopic: null,
    currentTopicReplies: null,
    currentFilter: null,
    streamAmount: 12, // number of topics required in request
  },

  getters: {
    loadTopics: (state) => state.list,
    getCurrentTopic: (state) => state.currentTopic,
    getCurrentTopicReplyes: (state) => state.currentTopicReplies,
  },

  actions: {

    // WAITING API IMPLEMENT
    loadInitialTopics({ commit }, { type, pagination }) {
      Promise((resolve, reject) => {
        api.get('/getInitialTopics', {
          params: {
            type,
            pagination,
          },
        })
          .then((response) => {
            console.log('topics/loadInitialTopics');
            commit('SET_TOPICS_LIST', response.data);
            resolve(response);
          })
          .catch((error) => {
            console.log(error.message);
            reject(error);
          });
      });
    },

    // AWAIT API IMPLEMENT
    loadMoreTopics({ commit }, { type, pagination }) {
      // this action is performed every time the user reaches the last topic on the topics page.
      // const nextStreamStart = (pagination * state.streamAmount) + 1;
      Promise((resolve, reject) => {
        api.get('/getMoreTopics', {
          params: {
            type,
            pagination,
          },
        })
          .then((response) => {
            console.log('topics/loadMoreTopics');
            commit('SET_TOPICS_LIST', response.data);
            resolve(response);
          })
          .catch((error) => {
            console.log(error.message);
            reject(error);
          });
      });
    },

    // OK - AWAIT API IMPLEMENT
    async createNewTopic({
      commit,
      rootGetters,
    }, { data }) {
      // getters { userId }
      const userId = rootGetters['users/getUserId']; // IMPLEMENTAR ISSO NO MÓDULO USERS
      const token = localStorage.getItem('access_token');
      // response
      // const newTopic = {
      //   topicId: Number, // id do diálogo
      //   title: String, // titulo do diálogo
      //   topicCategory: Number, // id da categoria principal do diálogo
      //   categoriesTagged: Array, // id das categorias relacionadas ao diálogo
      //   userRef: {
      //     name: Number, // nome do usuário proprietário deste diálogo
      //     id: Number, // id do usuário
      //     categoryId: Number, // categoria do usuário
      //     avatarUrl: String, // url do avatar do usuário
      //   },
      //   createdAt: String, // data de criação do diálogo --- JS DATE OBJECT
      //   content: String, // texto do diálogo
      //   positiveSupports: Number, // votos a favor
      //   negativeSupports: Number, // votos contra
      //   numberOfReplies: Number, // número de respostas/comentários
      //   views: Number, // números de visualizações
      // };
      return new Promise((resolve, reject) => {
        api.post('/createNewTopic', {
          body: {
            userId,
            title: data.title,
            content: data.content,
            topicCategory: data.topicCategory,
            categoriesTagged: data.categoriesTagged,
          },
          headers: {
            Autrhorization: `token ${token}`,
          },
        })
          .then((response) => {
            console.log('topics/createNewTopic - response', response.data);
            commit('ADD_NEW_TOPIC', response.data);
            resolve(response);
          })
          .catch((error) => {
            console.log(error.message);
            reject(error);
          });
      });
    },

    // TO BE REWIWED
    loadCurrentTopic({ commit }, { topicId }) {
      Promise((resolve, reject) => {
        api.get('/getCurrentTopic', {
          topicId,
        })
          .then((response) => {
            console.log('topics/loadCurrentTopic - response', response.data);
            commit('SET_CURRENT_TOPIC', response.data);
            resolve(response);
          })
          .catch((error) => {
            console.log(error.message);
            reject(error);
          });
      });
      console.log('topics/loadCurrentTopic LOG');
    },

    // TO BE REWIWED
    loadCurrentTopicReplyes({ commit }, { topicId }) {
      Promise((resolve, reject) => {
        api.get('/getCurrentTopicReplyes', {
          topicId,
        })
          .then((response) => {
            console.log('topics/loadCurrentTopicReplyes - response', response.data);
            commit('SET_CURRENT_TOPIC_REPLYES', response.data);
            resolve(response);
          })
          .catch((error) => {
            console.log(error.message);
            reject(error);
          });
      });
    },

    // TO BE IMPLEMENTED
    // async updateTopic({ commit }, { topicId, data }) {
    //   await apiClient.updateTopic(topicId, data);
    //   return topicId;
    // },

    // TO BE IMPLEMENTED
    // async deleteTopic({ commit }, { topicId }) {
    //   await apiClient.deleteTopic(topicId);
    // },

    // OK
    supportCurrentTopic({ state, commit }, { supportType }) {
      // Promise((resolve, reject) => {
      //   api.patch('/updateSupport', {
      //     topicId: state.currentTopic.id,
      //     supportType,
      //   })
      //     .then((response) => {
      //       console.log('topics/supportThis response', response.message);
      //       commit('ADD_SUPPORT', supportType);
      //       resolve(response);
      //     })
      //     .catch((error) => {
      //       console.log(error.message);
      //       reject(error);
      //     });
      // });
      const newSupport = { topicId: state.currentTopic.id, support: supportType }; // TO BE DELETED
      console.log('topics/supportCurrentTopic', newSupport); // TO BE DELETED
      commit('ADD_SUPPORT', { supportType }); // TO BE DELETED
    },

    // OK
    addReply({
      state,
      commit,
      dispatch,
      rootGetters,
    }, { data }) {
      // generate new key to being used as id, on this new reply. LOCAL IMPLEMENTATION ONLY
      dispatch('setKey'); // TO BE DELETED
      const replyId = state.key; // TO BE DELETED
      // get data from current user, to reference this reply.
      const userRef = rootGetters['users/getUserReference'];
      // get current date and time
      const today = new Date();
      const date = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
      // mount reply object
      const newReply = {
        id: replyId, // TO BE DELETED
        topicId: state.currentTopic.id,
        user: userRef,
        replyTag: data.replyTag,
        content: data.content,
        createdAt: date,
        numberOfLikes: 0,
      };
      console.log('topics/addReply', newReply);
      // post to api - newReply object to be added, and this topic id as reference.
      // Promise((resolve, reject) => {
      //   api.get('/addNewReply', {
      //     newReply,
      //   })
      //     .then((response) => {
      //       console.log('topics/loadCurrentTopicReplyes - response', response.data);
      //       commit('ADD_REPLY_TO_CURRENT_TOPIC', response.data);
      //       resolve(response);
      //     })
      //     .catch((error) => {
      //       console.log(error.message);
      //       reject(error);
      //     });
      // });
      commit('ADD_REPLY_TO_CURRENT_TOPIC', newReply); // TO BE DELETED
    },

    // TO BE REWIEWED
    deleteReply({ commit }, { replyId }) {
      // post to api, this reply id to be deleted.
      // Promise((resolve, reject) => {
      //   api.post('/deleteReply', {
      //     replyId,
      //   })
      //     .then((response) => {
      //       console.log('topics/deleteReply - response', response);
      //       commit('DELETE_REPLY', { replyId });
      //       resolve(response);
      //     })
      //     .catch((error) => {
      //       console.log(error.message);
      //       reject(error);
      //     });
      // });
      console.log('topics/deleteReply', replyId);
      commit('DELETE_REPLY', { replyId });
    },

    // TO BE REWIEWED
    updateReply({ commit }, { replyId, data }) {
      console.log('topics/updateReply', replyId);
      // console.log('topics/updateReply', data);
      // post to api, this reply id and newData to be updated.
      // api post action HERE ------ (replyId, data);
      // then
      commit('UPDATE_REPLY', { replyId, data }); // update local storage.
    },

    // TO BE TESTED
    incrementLikeInReply({ commit }, { replyId }) {
      // Promise((resolve, reject) => {
      //   api.patch('/incrementLikeInReply', {
      //     replyId,
      //   })
      //     .then((response) => {
      //       console.log('topics/incrementLikeInReply', response.message);
      //       commit('INCREMENT_LIKE_IN_REPLY', { replyId });
      //     })
      //     .catch((error) => {
      //       console.log(error.message);
      //       reject(error);
      //     });
      // });
      commit('INCREMENT_LIKE_IN_REPLY', { replyId });
    },

    // TO BE TESTED
    decrementLikeInReply({ commit }, { replyId }) {
      console.log('topics/decrementLikeInReply', replyId);
      commit('DECREMENT_LIKE_IN_REPLY', { replyId });
    },

    // TO BE REWIEWED
    getReplyTag({ state }, { replyTagId }) {
      // find reply element to being tagged
      const data = state.currentTopicReplies.find((el) => el.id === replyTagId);
      console.log('topics/getReplyTag', data);
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
      console.log('generated KEY', key);
      commit('SET_KEY', { newKey: key });
    },
  },

  mutations: {
    // OK
    SET_TOPICS_LIST(state, { data }) {
      state.list.push(data);
    },

    // OK
    SET_CURRENT_TOPIC(state, data) {
      state.currentTopic = data;
    },

    // OK
    SET_CURRENT_TOPIC_REPLYES(state, data) {
      state.currentTopicReplies = data;
    },

    // TO BE REWIEWED
    ADD_NEW_TOPIC(state, { data }) {
      state.list.push(data);
    },

    // TO BE REWIEWED
    ADD_SUPPORT(state, { supportType }) {
      if (supportType) {
        // approved
        state.currentTopic.positiveSupports += 1;
      } else {
        // not approved
        state.currentTopic.negativeSupports += 1;
      }
    },

    // NO CALLED
    POSITIVE_SUPPORT_DECREMENT(state) {
      state.currentTopic.positiveSupports -= 1;
    },

    // NO CALLED
    NEGATIVE_SUPPORT_DECREMENT(state) {
      state.currentTopic.negativeSupports -= 1;
    },

    // OK
    ADD_REPLY_TO_CURRENT_TOPIC(state, data) {
      console.log('ADD_REPLY_TO_CURRENT_TOPIC', data);
      // state.currentTopicReplies.push(data);
      state.replies.push(data); // TO BE DELETED
    },

    // Ok
    DELETE_REPLY(state, { replyId }) {
      console.log('topics/DELETE_REPLY', replyId);
      // const replyIndex = state.currentTopicReplies.findIndex((reply) => reply.id === replyId);
      // state.currentTopicReplies.splice(replyIndex, 1);
      const replyIndex = state.replies.findIndex((reply) => reply.id === replyId); // TO BE DELETED
      state.replies.splice(replyIndex, 1); // TO BE DELETED
    },

    // TO BE IMPLEMENTED
    UPDATE_REPLY(state, { replyId, data }) {
      // const replyIndex = state.currentTopicReplies.findIndex((reply) => reply.id === replyId);
      // state.currentTopicReplies[replyIndex].content = data;
      const replyIndex = state.replies.findIndex((reply) => reply.id === replyId); // TO BE DELETED
      state.replies[replyIndex].content = data; // TO BE DELETED
    },

    // OK
    INCREMENT_LIKE_IN_REPLY(state, { replyId }) {
      const replyIndex = state.currentTopicReplies.findIndex((reply) => reply.id === replyId);
      state.currentTopicReplies[replyIndex].numberOfLikes += 1;
    },

    // OK
    DECREMENT_LIKE_IN_REPLY(state, { replyId }) {
      const replyIndex = state.currentTopicReplies.findIndex((reply) => reply.id === replyId);
      state.currentTopicReplies[replyIndex].numberOfLikes -= 1;
    },

    // OK
    SET_KEY(state, { newKey }) {
      state.key = newKey;
      console.log('topics/setKey', newKey);
    },
  },

};
