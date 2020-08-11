import api from '../../apiClient';

export default {
  namespaced: true,
  state: {
    list: [
      {
        id: 1,
        userId: '',
        title: 'Dance_Fest',
        date: '2020/05/13', // ADD ISO FORMAT ---  YYYY-MM-DDTHH:mm:ss.sssZ
        time: '13:00',
        address: {
          street: 'Rua do Dinar',
          neighborhood: 'Vila Carlota',
          city: 'campo grande',
        },
        ticket: '0',
        link: 'https://www.facebook.com/henriquemleonel',
        description: 'Festival de dança da comunidade para a comunidade, venha se divertir',
        categoryId: 1,
        imgUrl: '../assets/statics/avatar01.jpg',
      },
    ],
  },

  getters: {
    loadEvents: (state) => state.list,
  },

  actions: {
    // WAITING API IMPLEMENT
    loadInitialEvents({ commit }, { type, pagination }) {
      return new Promise((resolve, reject) => {
        api.get('/getInitialEvents', {
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
    loadMoreEvents({ commit }, { type, pagination }) {
      // this action is performed every time the user reaches the last topic on the topics page.
      // const nextStreamStart = (pagination * state.streamAmount) + 1;
      return new Promise((resolve, reject) => {
        api.get('/getMoreEvents', {
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
  },
};
