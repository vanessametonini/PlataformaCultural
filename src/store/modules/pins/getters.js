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
};

export default getters;
