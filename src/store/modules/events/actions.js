import api from '../../../apiClient';

const token = localStorage.getItem('access_token');
const actions = {

  loadEvents({ commit, dispatch, rootGetters }) {
    dispatch('services/GET', { uri: 'events' }, { root: true })
      .then((response) => {
        const events = response.data.map((event) => {
          const date = rootGetters.formatDate(event.dateTime);
          const time = rootGetters.formatTime(event.dateTime);
          return {
            ...event,
            date,
            time,
          };
        });
        commit('SET_EVENTS_LIST', events);
      })
      .catch((error) => {
        console.log(error.message);
      });
  },

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
};

export default actions;
