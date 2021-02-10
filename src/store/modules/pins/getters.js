import { getField } from 'vuex-map-fields';

const getters = {
  loadPins(state) {
    return state.list;
  },

  getMarkers({ state }) {
    return state.markers;
  },

  getPinById({ state }, { pinId }) {
    const index = state.pins.findIndex((item) => item.id === pinId);
    return state.list[index];
  },

  getField,
};

export default getters;
