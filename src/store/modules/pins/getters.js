import { getField } from 'vuex-map-fields';

const i1 = require('../../../assets/pins/1.png');
const i2 = require('../../../assets/pins/2.png');
const i3 = require('../../../assets/pins/3.png');
const i4 = require('../../../assets/pins/4.png');
const i5 = require('../../../assets/pins/5.png');
const i6 = require('../../../assets/pins/6.png');
const i7 = require('../../../assets/pins/7.png');
const i8 = require('../../../assets/pins/8.png');
const i9 = require('../../../assets/pins/9.png');
const i10 = require('../../../assets/pins/10.png');
const i11 = require('../../../assets/pins/11.png');
const i12 = require('../../../assets/pins/12.png');
const i13 = require('../../../assets/pins/13.png');
const i14 = require('../../../assets/pins/14.png');
const i15 = require('../../../assets/pins/15.png');
const i16 = require('../../../assets/pins/16.png');
const i17 = require('../../../assets/pins/17.png');
const i18 = require('../../../assets/pins/18.png');
const i19 = require('../../../assets/pins/19.png');
const i20 = require('../../../assets/pins/20.png');

const images = [i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12, i13, i14, i15, i16, i17, i18, i19, i20];

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
    state.listFiltered.forEach((item) => markers.push({ ...item, coordinates: [item.lat, item.long], image: images[rootGetters['categories/getCategoryById'](item.categoryId).value - 1 ]}));
    return markers;
  },

  getPinById: (state) => (pinId) => {
    const index = state.pins.findIndex((item) => item.id === pinId);
    return state.list[index];
  },

  getField,
};

export default getters;
