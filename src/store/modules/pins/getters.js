import { getField } from 'vuex-map-fields';

const getters = {
  loadPins(state) {
    return state.list;
  },

  getMarkers(state) {
    const markers = [];
    state.list.forEach((item) => markers.push({ ...item, coordinates: [item.lat, item.long], image: `../../../assets/icons/pins/${(item.categoryId - 1) / 10 + 1}.png` }));
    return markers;
  },

  getPinById({ state }, { pinId }) {
    const index = state.pins.findIndex((item) => item.id === pinId);
    return state.list[index];
  },

  getField,
};

export default getters;
