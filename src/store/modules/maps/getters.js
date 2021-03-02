import { getField } from 'vuex-map-fields';

const getters = {
  getCenter(state) {
    return state.mapOptions.center;
  },
  getZoom(state) {
    return state.zoomSet.zoom;
  },
  getField,
};

export default getters;
