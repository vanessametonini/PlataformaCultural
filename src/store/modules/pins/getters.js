import { getField } from 'vuex-map-fields';

const i1 = require('../../../assets/icons/pins/1.png');
const i2 = require('../../../assets/icons/pins/2.png');
const i3 = require('../../../assets/icons/pins/3.png');
const i4 = require('../../../assets/icons/pins/4.png');
const i5 = require('../../../assets/icons/pins/5.png');
const i6 = require('../../../assets/icons/pins/6.png');
const i7 = require('../../../assets/icons/pins/7.png');
const i8 = require('../../../assets/icons/pins/8.png');
const i9 = require('../../../assets/icons/pins/9.png');
const i10 = require('../../../assets/icons/pins/10.png');
const i11 = require('../../../assets/icons/pins/11.png');
const i12 = require('../../../assets/icons/pins/12.png');
const i13 = require('../../../assets/icons/pins/13.png');
const i14 = require('../../../assets/icons/pins/14.png');
const i15 = require('../../../assets/icons/pins/15.png');
const i16 = require('../../../assets/icons/pins/16.png');
const i17 = require('../../../assets/icons/pins/17.png');
const i18 = require('../../../assets/icons/pins/18.png');

const images = [i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i1, i12, i13, i14, i15, i16, i17, i18];

const getters = {
  loadPins(state) {
    return state.list;
  },
  loadPinsFiltered(state) {
    return state.listFiltered;
  },
  getMarkers(state) {
    const markers = [];
    state.listFiltered.forEach((item) => markers.push({ ...item, coordinates: [item.lat, item.long], image: images[(item.categoryId - 1) / 10] }));
    return markers;
  },

  getPinById: (state) => (pinId) => {
    const index = state.pins.findIndex((item) => item.id === pinId);
    return state.list[index];
  },

  getField,
};

export default getters;
