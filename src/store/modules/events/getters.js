import { getField } from 'vuex-map-fields';

const getters = {
  loadEvents: (state) => state.list,
  getEventForm: (state) => state.eventForm,
  getField,
};

export default getters;
