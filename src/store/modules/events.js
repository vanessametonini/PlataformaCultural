import api from '../../apiClient';

const token = localStorage.getItem('access_token');

export default {
  namespaced: true,
  state: {
    list: [],
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
          headers: {
            Autrhorization: `token ${token}`,
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
          headers: {
            Autrhorization: `token ${token}`,
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

    addNewEvent() {},

    updateEvent({ commit }, { eventId, newData }) {
      return new Promise((resolve, reject) => {
        api.patch('/updateEvent', {
          body: {
            eventId,
            newData,
          },
          headers: {
            Autrhorization: `token ${token}`,
          },
        })
          .then((response) => {
            console.log('events/updateEvent');
            commit('UPDATE_EVENT', response.data);
            resolve(response);
          })
          .catch((error) => {
            console.log(error.message);
            reject(error);
          });
      });
    },

    deleteEvent({ commit }, { eventId }) {
      return new Promise((resolve, reject) => {
        api.post('/deleteEvent', {
          body: {
            eventId,
          },
          headers: {
            Autrhorization: `token ${token}`,
          },
        })
          .then((response) => {
            console.log('events/deleteEvent');
            commit('DELETE_EVENT', response.data);
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
      state.list = data;
    },

    // OK
    SET_CURRENT_EVENT(state, { data }) {
      state.currentEvent = data;
    },

    // TO BE REWIEWED
    ADD_NEW_EVENT(state, { data }) {
      state.list.push(data);
    },

    // TO BE REWIEWED
    UPDATE_EVENT(state, { newData }) {
      const index = state.list.findIndex((el) => el.id === newData.id);
      state.list[index] = newData.body;
    },

    // TO BE REWIEWED
    DELETE_EVENT(state, { data }) {
      const index = state.list.findIndex((el) => el.id === data.id);
      state.list.splice(index, 1);
    },
  },
};
