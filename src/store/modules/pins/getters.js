import { getField } from 'vuex-map-fields';

const getters = {
  getMyPins: (state, getters, rootState, rootGetters) => state.list.filter((pin) => pin.userId===rootGetters['users/getCurrentUser'].id),

  getSelectedPinId(state) {
    return state.selectedPinId;
  },
  getCategorySelected: (state) => state.categorySelected,
  loadPins(state) {
    return state.list;
  },
  loadPinsFiltered(state) {
    return state.listFiltered;
  },
  getColors: (state) => (category) => {
    if (state.selecteds.length === 0 || state.selecteds.includes(category.id)) {
      return category.color;
    }
    return '#b8bfc2';
  },
  getMarkers(state, getters, rootState, rootGetters) {
    const markers = [];
    state.listFiltered.forEach((item) => markers.push({ ...item, coordinates: [item.lat, item.long]}));
    return markers;
  },

  getPinById: (state) => (pinId) => {
    const index = state.list.findIndex((item) => item.id === pinId);
    return state.list[index];
  },

  getField,
};

export default getters;
