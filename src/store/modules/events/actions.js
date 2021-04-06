import api from '../../../apiClient';

const token = localStorage.getItem('access_token');
const actions = {

  createNewEvent({
    commit,
    getters,
    dispatch,
    rootGetters,
  }) {
    const event = {
      ...getters.getEventForm,
      userId: rootGetters['users/getCurrentUser'].id,
      // createdAt: rootGetters.date,
    };
    const datearray = event.date.split('/');
    event.date = new Date(`${datearray[2]}/${datearray[1]}/${datearray[0]} ${event.time}:00`)
    // event.dateTime = `${datearray[2]}/${datearray[1]}/${datearray[0]} ${event.time}:00`;
    // delete event.date;
    // delete event.time;
    dispatch('services/POST', { uri: 'events', data: event }, { root: true })
      .then((response) => {
        const payload = {
          ...event,
          images: event.imageIds,
          id: response,
          date: rootGetters.formatDate(event.date),
          time: rootGetters.formatTime(event.date),
          dateTime: event.date
        }
        commit('ADD_EVENT_LIST', payload );
      })
      .catch((error) => error);
  },

  loadEvents({ commit, dispatch, rootGetters }) {
    dispatch('services/GET', { uri: 'events' }, { root: true })
      .then((response) => {
        const events = response.data.map((event) => {
          const date = rootGetters.formatDate(event.date);
          const time = rootGetters.formatTime(event.date);
          return {
            ...event,
            images: event.imageIds,
            date,
            time,
            dateTime: event.date
          };
        });
        commit('SET_EVENTS_LIST', events);
      })
      .catch((error) => error);
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
          commit('SET_TOPICS_LIST', response.data);
          resolve(response);
        })
        .catch((error) => reject(error));
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
          commit('SET_TOPICS_LIST', response.data);
          resolve(response);
        })
        .catch((error) => reject(error));
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
          commit('UPDATE_EVENT', response.data);
          resolve(response);
        })
        .catch((error) => reject(error));
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
          commit('DELETE_EVENT', response.data);
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  },
};

export default actions;
