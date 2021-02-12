// import Vue from 'vue';
import api from '../../../apiClient';

const actions = {

  loadTopics({ dispatch, commit }) {
    dispatch('services/GET', { uri: 'topics' }, { root: true })
      .then((response) => {
        const topics = response.data;
        commit('SET_TOPICS_LIST', topics);
      })
      .catch((error) => {
        console.log(error.message);
      });
  },

  // WAITING API IMPLEMENT
  loadInitialTopics({ commit }, { type, pagination }) {
    const loadFunc = new Promise((resolve, reject) => {
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
    loadFunc();
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
  }, { data }) {
    // getters { userId }
    // const userId = rootGetters['users/getUserId']; // IMPLEMENTAR ISSO NO MÓDULO USERS
    const token = localStorage.getItem('access_token');
    const userId = 1;
    // const vuexDados = localStorage.getItem('vuex');
    // const vuexObj = JSON.parse(vuexDados);
    // const userId = vuexObj.users.currentUser.id;
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
      console.log(data.categoriesTagged);
      const arrayTagged = [];
      data.categoriesTagged.forEach((element) => {
        arrayTagged.push(element.value);
      });
      api.post('/topic', {
        body: {
          userId,
          title: data.title,
          content: data.content,
          topicCategory: data.topicCategory.value,
          categoriesTagged: arrayTagged,
        },
        headers: {
          Autrhorization: `token ${token}`,
        },
      })
        .then((response) => {
          console.log('topics/createNewTopic - response', response.data);
          console.log(response);
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
};

export default actions;
