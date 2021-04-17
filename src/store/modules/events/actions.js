import { Notify } from 'quasar';

const actions = {

  createNewEvent({
    commit,
    getters,
    dispatch,
    rootGetters,
  }) {

    const notif = Notify.create({
      group: false,
      spinner: true,
      message: 'Cadastrando evento...',
    });

    const event = {
      ...getters.getEventForm,
      userId: rootGetters['users/getCurrentUser'].id,
      createdAt: new Date(),
    };
    const datearray = event.date.split('/');
    event.date = new Date(`${datearray[2]}/${datearray[1]}/${datearray[0]} ${event.time}:00`)
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
        commit('ADD_EVENT_LIST', payload);
        notif({
          icon: 'done',
          spinner: false,
          message: 'Evento cadastrado!',
        })
      })
      .catch((error) => {
        notif({
          type: 'negative',
          spinner: false,
          message: 'Não foi possível cadastrar seu pin.',
        });
        return error;
      });
  },

  loadEvents({ commit, dispatch, rootGetters }) {
    dispatch('services/GET', { uri: 'events' }, { root: true })
      .then(async (response) => {
        const eventsArray = response.data.map((event) => {
          return dispatch('services/GET', { uri: `users/${event.userId}` }, { root: true })
            .then((response) => {
              const date = rootGetters.formatDate(event.date);
              const time = rootGetters.formatTime(event.date);
              return {
                ...event,
                user: response.data,
                images: event.imageIds,
                date,
                time,
                dateTime: event.date
              }
            })
        });
        const events = await Promise.all(eventsArray);
        commit('SET_EVENTS_LIST', events);
      })
      .catch((error) => {
        return error;
      });
  },
};

export default actions;
