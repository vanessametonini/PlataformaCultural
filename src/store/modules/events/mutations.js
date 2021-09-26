import { updateField } from 'vuex-map-fields';

const mutations = {
  CLEAR_EVENT_FORM(state) {
    state.eventForm = {
      title: '',
      date: null,
      time: '',
      street: '',
      neighborhood: '',
      city: '',
      ticket: '',
      link: '',
      description: '',
      categoryId: null,
      imgUrl: '',
    };
  },

  SET_EVENTS_LIST(state, data) {
    state.list = data;
  },

  ADD_EVENT_LIST(state, data) {
    state.list.push(data);
  },

  SET_TOPICS_LIST(state, { data }) {
    state.list = data;
  },

  SET_CURRENT_EVENT(state, data) {
    state.currentEvent = data;
  },

  ADD_NEW_EVENT(state, { data }) {
    state.list.push(data);
  },

  UPDATE_EVENT(state, updatedEvent) {
    const toUpdate = state.list.findIndex(event => event.id === updatedEvent.id);
    state.list[toUpdate] = { ...state.list[toUpdate], ...updatedEvent };
  },

  DELETE_EVENT(state, { data }) {
    const index = state.list.findIndex((el) => el.id === data.id);
    state.list.splice(index, 1);
  },

  updateField,

};

export default mutations;
