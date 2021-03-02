import { updateField } from 'vuex-map-fields';

const mutations = {
  TRANSLATE_MAP_CENTER(state, position) {
    state.mapOptions.center = { lat: position[0], lng: position[1] };
  },

  ZOOM_MAP(state, zoom) {
    state.zoomSet.zoom = zoom;
  },

  updateField,
};

export default mutations;
